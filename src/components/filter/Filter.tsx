import { type FC, useState } from 'react'

import { checkedOptStore } from '@src/store'

import { FilterType } from '@api/types/Filter'

import { OptionsForm } from './OptionsForm'
import { SubmitComponent } from './SubmitComponent'

export const Filter: FC<{ onClose: () => void }> = ({ onClose }) => {
	const { filter: storedOptions, setFilter } = checkedOptStore()

	const [selectedOptions, setSelectedOptions] = useState(() =>
		Object.fromEntries(
			storedOptions.map(({ id, optionsIds }) => [id, optionsIds])
		)
	)
	const [isSubmitting, setIsSubmitting] = useState(false)

	return !isSubmitting ? (
		<OptionsForm
			handleSubmit={() => {
				setIsSubmitting(true)
			}}
			{...{ selectedOptions, setSelectedOptions }}
		/>
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
