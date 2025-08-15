import { type FC, type PropsWithChildren, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import CloseIcon from '@assets/icons/close.svg'
import { Button } from '@components/ui/Button'

export const Modal: FC<PropsWithChildren<{ onClose: () => void }>> = ({
	children,
	onClose
}) => {
	const dialogRef = useRef<HTMLDialogElement>(null)
	useEffect(() => {
		const dialog = dialogRef.current

		if (dialog && !dialog.open) {
			dialog.showModal()
		}
		const handleClickOutside = (event: PointerEvent) => {
			if (event.target === dialog) {
				dialog?.close()
			}
		}
		dialog?.addEventListener('click', handleClickOutside)

		return () => {
			dialog?.removeEventListener('click', handleClickOutside)
		}
	}, [])
	return createPortal(
		<dialog
			ref={dialogRef}
			className="backdrop:backdrop-blur-sm rounded-2xl shadow-xl w-full mx-auto max-w-7xl mt-20 border-none max-h-8/10 overflow-auto"
			onClose={() => {
				onClose()
			}}
		>
			<div className=" px-9 pt-12 pb-8">{children}</div>

			<Button
				variant="icon"
				className="absolute top-6 md:top-12 right-6"
				onClick={() => {
					dialogRef.current?.close()
				}}
			>
				<CloseIcon />
			</Button>
		</dialog>,
		document.body
	)
}
