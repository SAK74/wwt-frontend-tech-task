import { Suspense, lazy, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Modal } from '@components/Modal'
import { Button } from '@components/ui/Button'

import { StoredOptions } from './StoredOptions'

const Filter = lazy(() =>
	import('@src/components/filter/Filter').then(module => ({
		default: module.Filter
	}))
)

export const App = () => {
	const [isModalOpen, setIsModalopen] = useState(false)
	const { t } = useTranslation()

	return (
		<section className="w-full h-dvh flex flex-col items-center justify-center">
			{/* eslint-disable-next-line i18next/no-literal-string */}
			<h1 className="text-4xl text-gray-600 mb-12">
				WinWinTravel frontend test task
			</h1>

			<StoredOptions />
			<Button
				className="my-8"
				onClick={() => {
					setIsModalopen(true)
				}}
			>
				{t('home.open_filter')}
			</Button>

			{isModalOpen && (
				<Modal
					onClose={() => {
						setIsModalopen(false)
					}}
				>
					<Suspense fallback="loading!!!!">
						<Filter
							onClose={() => {
								setIsModalopen(false)
							}}
						/>
					</Suspense>
				</Modal>
			)}
		</section>
	)
}
