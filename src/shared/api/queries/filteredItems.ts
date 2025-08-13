import { useQuery } from '@tanstack/react-query'

import { fakeReader } from '../fakeReader'

export const useFilteredItems = () =>
	useQuery({
		queryKey: ['filters'],
		queryFn: () => fakeReader().then(items => items.filterItems)
	})
