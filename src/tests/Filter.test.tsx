import { checkedOptStore } from '@src/store'
import { fireEvent, render, screen } from '@testing-library/react'
import { Mock } from 'vitest'

import { type FilterItem, FilterType } from '@api/types/Filter'

import { Filter } from '@components/filter/Filter'
import { App } from '@pages/Home'

vi.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string) => key
	})
}))

const mockedFiltersData: FilterItem[] = vi.hoisted(() => [
	{
		id: '1',
		name: 'Test Filter',
		type: 'OPTION' as FilterType,
		options: [
			{ id: 'A', name: 'Option A' },
			{ id: 'B', name: 'Option B' },
			{ id: 'C', name: 'Option C' }
		]
	}
])

vi.mock('@api/queries/filteredItems', () => ({
	useFilteredItems: vi
		.fn()
		.mockReturnValue({ data: mockedFiltersData, isLoading: false })
}))

const onCloseSpy = vi.fn()

const mockedSetFilter = vi.hoisted(() => vi.fn())

const originalStoreImpl = vi.hoisted(() => () => ({
	filter: [],
	setFilter: mockedSetFilter
}))

vi.mock('@src/store', () => ({
	checkedOptStore: vi.fn().mockImplementation(originalStoreImpl)
}))

describe('integration tests', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		;(checkedOptStore as unknown as Mock).mockImplementation(originalStoreImpl)
	})

	it('modal should be opened after click the button', async () => {
		render(<App />)
		const openBtn = screen.getByText('home.open_filter')
		expect(openBtn).toBeInTheDocument()
		fireEvent.click(openBtn)
		const modal = await screen.findByRole('dialog')
		expect(modal).toBeInTheDocument()
	})

	it('should render the filter with empty checks', async () => {
		render(<Filter onClose={onCloseSpy} />)
		const renderedOptions = await screen.findAllByRole('checkbox')
		expect(renderedOptions).toHaveLength(3)
		renderedOptions.forEach(box => {
			expect(box).not.toBeChecked()
		})
	})

	it('should render the filter with stored checks', async () => {
		// mock stored all options
		;(checkedOptStore as unknown as Mock).mockReturnValue({
			filter: mockedFiltersData.map(({ id, type, options }) => ({
				id,
				type,
				optionsIds: options.map(opt => opt.id)
			})),
			setFilter: mockedSetFilter
		})
		render(<Filter onClose={onCloseSpy} />)
		const renderedOptions = await screen.findAllByRole('checkbox')
		expect(renderedOptions).toHaveLength(3)
		renderedOptions.forEach(box => {
			expect(box).toBeChecked()
		})
	})

	it('should clear all options', async () => {
		// mock stored all options
		;(checkedOptStore as unknown as Mock).mockReturnValue({
			filter: mockedFiltersData.map(({ id, type, options }) => ({
				id,
				type,
				optionsIds: options.map(opt => opt.id)
			})),
			setFilter: mockedSetFilter
		})
		render(<Filter onClose={onCloseSpy} />)
		const renderedOptions = await screen.findAllByRole('checkbox')
		expect(renderedOptions).toHaveLength(3)
		renderedOptions.forEach(box => {
			expect(box).toBeChecked()
		})
		const clearBtn = screen.getByRole('button', { name: 'filter.clear' })
		expect(clearBtn).toBeInTheDocument()
		fireEvent.click(clearBtn)
		renderedOptions.forEach(box => {
			expect(box).not.toBeChecked()
		})
	})

	it('should open submit window, store selected options and close the modal', async () => {
		render(<Filter onClose={onCloseSpy} />)
		const renderedOptions = await screen.findAllByRole('checkbox')
		expect(renderedOptions).toHaveLength(3)
		const firstOPtion = renderedOptions[0]
		fireEvent.click(firstOPtion)
		expect(firstOPtion).toBeChecked()

		const applyBtn = screen.getByRole('button', { name: 'filter.apply' })
		expect(applyBtn).toBeInTheDocument()
		fireEvent.click(applyBtn)

		const sbmtBtn = screen.getByRole('button', { name: 'filter.submit.submit' })
		expect(sbmtBtn).toBeInTheDocument()
		fireEvent.click(sbmtBtn)

		expect(mockedSetFilter).toHaveBeenCalledWith([
			{ id: '1', optionsIds: ['A'], type: 'OPTION' }
		])

		expect(onCloseSpy).toHaveBeenCalled()
	})
})
