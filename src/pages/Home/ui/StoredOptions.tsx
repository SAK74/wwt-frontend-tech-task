import type { FC } from 'react'

import { checkedOptStore } from '@src/store'

export const StoredOptions: FC = () => {
	const storedOpts = checkedOptStore(state => state.filter)

	return (
		Boolean(storedOpts.length) && (
			<>
				{/* eslint-disable-next-line i18next/no-literal-string */}
				<h5>Stored options:</h5>
				<div className="w-full flex justify-around flex-wrap gap-y-4">
					{Boolean(storedOpts.length) &&
						storedOpts.map(item => (
							<div key={item.id}>
								<h6 className="text-center">{item.id}</h6>
								<p className="space-x-2">
									{item.optionsIds.map((opt, i, arr) => (
										<span key={opt}>
											{opt}
											{i !== arr.length - 1 && ','}
										</span>
									))}
								</p>
							</div>
						))}
				</div>
			</>
		)
	)
}
