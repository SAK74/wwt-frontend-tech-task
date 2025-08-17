import data from '@temp/filterData.json'

import type { FilterItem } from './types/Filter'

data.filterItems
export const fakeReader = async () => {
	return new Promise<{ filterItems: FilterItem[] }>(resolve => {
		setTimeout(() => {
			resolve(data as { filterItems: FilterItem[] })
		}, 2000)
	})
}
