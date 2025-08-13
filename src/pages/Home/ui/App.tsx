import { Suspense, lazy, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { checkedOptStore } from '@src/store'

import { Modal } from '@components/Modal'

const Filter = lazy(() =>
	import('@components/Filter').then(module => ({ default: module.Filter }))
)

export const App = () => {
	const [isModalOpen, setIsModalopen] = useState(false)
	const { t } = useTranslation()

	const storedOpts = checkedOptStore(state => state.filter)

	return (
		<section className="w-full h-dvh flex flex-col items-center justify-center">
			{/* eslint-disable-next-line i18next/no-literal-string */}
			<h1 className="text-4xl text-gray-600 mb-12">
				WinWinTravel frontend test task
			</h1>
			{/* eslint-disable-next-line i18next/no-literal-string */}
			<h5>Stored options:</h5>
			<div className="w-full flex justify-around flex-wrap gap-y-4">
				{Boolean(storedOpts.length) &&
					storedOpts.map(item => (
						<div key={item.id}>
							<h6 className="text-center">{item.id}</h6>
							<p className="space-x-2">
								{!item.optionsIds.length
									? '---'
									: item.optionsIds.map(opt => <span key={opt}>{opt}</span>)}
							</p>
						</div>
					))}
			</div>

			<button
				onClick={() => {
					setIsModalopen(true)
				}}
			>
				{t('home.open_filter')}
			</button>

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
