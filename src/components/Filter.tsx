import { type FC, type FormEventHandler, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { checkedOptStore } from '@src/store'

import { FilterType } from '@api/types/Filter'

import data from '@temp/filterData.json'

import { SubmitComponent } from './SubmitComponent'

export const Filter: FC<{ onClose: () => void }> = ({ onClose }) => {
	const { filter: storedOptions, setFilter } = checkedOptStore()

	const [selectedOptions, setSelectedOptions] = useState(() =>
		Object.fromEntries(
			storedOptions.map(({ id, optionsIds }) => [id, optionsIds])
		)
	)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const { t } = useTranslation()

	const handleSubmit: FormEventHandler<HTMLFormElement> = ev => {
		ev.preventDefault()
		setIsSubmitting(true)
	}
	return !isSubmitting ? (
		<form onSubmit={handleSubmit}>
			<h1>{t('filter.header')}</h1>
			{data.filterItems.map(fItem => (
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
	) : (
		<SubmitComponent
			onSubmit={() => {
				setFilter(
					Object.entries(selectedOptions)
						.filter(([, options]) => options.length)
						.map(([id, optionsIds]) => ({
							id,
							optionsIds,
							type: FilterType.OPTION
						}))
				)
				onClose()
			}}
			onReject={() => {
				onClose()
			}}
		/>
	)
}
