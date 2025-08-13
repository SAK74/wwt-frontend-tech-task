import { type FC, type PropsWithChildren, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import CloseIcon from '@assets/icons/close.svg'

export const Modal: FC<PropsWithChildren<{ onClose: () => void }>> = ({
	children,
	onClose
}) => {
	const dialogRef = useRef<HTMLDialogElement>(null)
	useEffect(() => {
		if (!dialogRef.current?.open) {
			dialogRef.current?.showModal()
		}
	}, [])
	return createPortal(
		<dialog
			ref={dialogRef}
			className="backdrop:backdrop-blur-sm px-4 pt-12 pb-3 rounded-sm shadow-xl w-full mx-auto"
			onClose={() => {
				onClose()
			}}
		>
			{children}
			<button
				className="absolute top-2 right-2 cursor-pointer p-2"
				onClick={() => {
					dialogRef.current?.close()
				}}
			>
				<CloseIcon />
				{/* <XIcon color="darkblue" strokeWidth={4} /> */}
			</button>
		</dialog>,
		document.body
	)
}
