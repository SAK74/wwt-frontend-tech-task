import type { ComponentProps, FC } from 'react'

import { cn } from '@src/utils/cn'

type CheckBoxProps = ComponentProps<'input'> & {
	label?: string
	inputClass?: string
}

export const CheckBox: FC<CheckBoxProps> = ({
	className,
	label,
	inputClass,
	...rest
}) => {
	return (
		<label
			className={cn(
				'inline-flex gap-4 items-center  cursor-pointer',
				className
			)}
		>
			<input
				className={cn('size-5 accent-foreground cursor-pointer', inputClass)}
				type="checkbox"
				{...rest}
			/>
			<span>{label}</span>
		</label>
	)
}
