import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '../ui/Button'

export const SubmitComponent: FC<{
	onSubmit: () => void
	onReject: () => void
}> = ({ onSubmit, onReject }) => {
	const { t } = useTranslation()
	return (
		<div className="space-y-30">
			<h1 className="text-center text-[40px]">{t('filter.submit.header')}</h1>
			<div className="flex justify-center gap-8 flex-col sm:flex-row">
				<Button
					variant="outline"
					className="md:px-20"
					onClick={onReject}
				>
					{t('filter.submit.reject')}
				</Button>
				<Button
					className="md:px-20"
					onClick={onSubmit}
					ref={button => button?.focus()}
				>
					{t('filter.submit.submit')}
				</Button>
			</div>
		</div>
	)
}
