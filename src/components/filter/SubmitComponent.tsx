import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const SubmitComponent: FC<{
	onSubmit: () => void
	onReject: () => void
}> = ({ onSubmit, onReject }) => {
	const { t } = useTranslation()
	return (
		<div>
			<h1>{t('filter.submit.header')}</h1>
			<button onClick={onReject}>{t('filter.submit.reject')}</button>
			<button onClick={onSubmit}>{t('filter.submit.submit')}</button>
		</div>
	)
}
