import type { ComponentProps, FC, PropsWithChildren } from 'react'

import { cn } from '@src/utils/cn'

type ButtonProps = ComponentProps<'button'> & {
	variant?: 'default' | 'outline' | 'link' | 'icon'
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
	children,
	className,
	variant = 'default',
	...rest
}) => {
	return (
		<button
			className={cn(
				'cursor-pointer rounded-2xl bg-primary h-10 px-8 md:px-16 font-semibold text-white hover:bg-hover active:bg-active md:h-12 lg:h-16',
				{
					'bg-background text-primary border-2 border-primary hover:bg-initial hover:text-active hover:border-active active:bg-primary active:text-white':
						variant === 'outline',
					'px-0! bg-background font-medium underline-offset-4 underline hover:bg-initial text-link hover:text-link-hover active:text-link-active active:bg-initial':
						variant === 'link',
					'p-2! h-auto! rounded-full bg-background': variant === 'icon'
				},
				className
			)}
			{...rest}
		>
			{children}
		</button>
	)
}
