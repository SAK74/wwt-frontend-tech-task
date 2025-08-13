import filter from './filter.json'
import home from './home.json'
import notFound from './not-found.json'

export const en = {
	translation: {
		filter: filter,
		'not-found': notFound,
		home
	}
} as const
