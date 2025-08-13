import type { Dispatch, FC, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

import { useFilteredItems } from '@api/queries/filteredItems'

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
		>
			<h1>{t('filter.header')}</h1>
			{isLoading && <p>Loading data....</p>}
			{data &&
				data.map(fItem => (
					<fieldset
						key={fItem.id}
						className="grid grid-cols-3"
						name={fItem.id}
					>
						<legend>{fItem.name}</legend>
						{fItem.options.map(option => (
							<label key={option.id}>
								<input
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
								{option.name}
							</label>
						))}
					</fieldset>
				))}
			<button>{t('filter.apply')}</button>
			<button
				type="button"
				onClick={() => {
					setSelectedOptions({})
				}}
			>
				{t('filter.clear')}
			</button>
		</form>
	)
}
