import type { Dispatch, FC, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

import { useFilteredItems } from '@api/queries/filteredItems'

import { Button } from '@components/ui/Button'

export const OptionsForm: FC<{
	handleSubmit: () => void
	selectedOptions: Record<string, string[]>
	setSelectedOptions: Dispatch<SetStateAction<Record<string, string[]>>>
}> = ({ handleSubmit, selectedOptions, setSelectedOptions }) => {
	const { data, isLoading } = useFilteredItems()
	const { t } = useTranslation()

	return (
		<form
			onSubmit={ev => {
				ev.preventDefault()
				handleSubmit()
			}}
			className="**:border-gray-200"
		>
			<h1 className="text-4xl text-center font-medium border-b pb-6">
				{t('filter.header')}
			</h1>
			{isLoading && <p>Loading data....</p>}
			{data && (
				<div className="flex flex-col gap-6 mt-15">
					{data.map(fItem => (
						<fieldset
							key={fItem.id}
							className="grid grid-cols-3 border-b pb-8 pt-7 gap-x-10 gap-y-4 justify-items-start"
							name={fItem.id}
						>
							<legend className="text-2xl font-medium">{fItem.name}</legend>
							{fItem.options.map(option => (
								<label
									key={option.id}
									className="inline-flex gap-4 items-center  cursor-pointer"
								>
									<input
										className="size-5 accent-foreground cursor-pointer"
										type="checkbox"
										name={option.id}
										checked={Boolean(
											selectedOptions[fItem.id]?.includes(option.id)
										)}
										onChange={({ target: { checked } }) => {
											setSelectedOptions(prev => {
												const opts = checked
													? [...(prev[fItem.id] ?? []), option.id]
													: prev[fItem.id].filter(opt => opt !== option.id)

												return { ...prev, [fItem.id]: opts }
											})
										}}
									/>
									<span>{option.name}</span>
								</label>
							))}
						</fieldset>
					))}
				</div>
			)}
			<div className="flex justify-center relative items-center mt-8 gap-4">
				<Button>{t('filter.apply')}</Button>
				<Button
					className="md:absolute md:right-0"
					variant="link"
					type="button"
					onClick={() => {
						setSelectedOptions({})
					}}
				>
					{t('filter.clear')}
				</Button>
			</div>
		</form>
	)
}
