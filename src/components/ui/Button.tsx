import type { ComponentProps, FC, PropsWithChildren } from 'react'

import { cn } from '@src/utils/cn'

type ButtonProps = ComponentProps<'button'> & {
	variant?: 'default' | 'outline' | 'link' | 'icon'
	size?: 'large' | 'medium' | 'small'
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
	children,
	className,
	variant = 'default',
	size = 'medium',
	...rest
}) => {
	return (
		<button
			className={cn(
				'cursor-pointer rounded-2xl bg-primary h-12 px-16 font-semibold text-white hover:bg-hover active:bg-active',
				{
					'bg-background text-inherit border border-primary hover:bg-initial':
						variant === 'outline',
					'px-0 bg-background font-medium underline-offset-4 underline hover:bg-initial text-link hover:text-link-hover active:text-link-active active:bg-initial':
						variant === 'link',
					'p-2 h-auto rounded-full bg-background ': variant === 'icon',
					'h-16': size === 'large',
					'h-10': size === 'small'
				},
				className
			)}
			{...rest}
		>
			{children}
		</button>
	)
}
