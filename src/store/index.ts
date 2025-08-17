import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import type { SearchRequestFilter } from '@api/types/SearchRequest/SearchRequestFilter'

export const checkedOptStore = create<{
	filter: SearchRequestFilter
	setFilter: (data: SearchRequestFilter) => void
}>()(
	immer(set => ({
		filter: [],
		setFilter: data => {
			set(state => {
				state.filter = data
			})
		}
	}))
)
