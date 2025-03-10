import type { HtmlHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

interface ButtonProps extends HtmlHTMLAttributes<HTMLButtonElement & HTMLAnchorElement> {
	children: ReactNode
	href?: string
}

export function Button({ children, className = '', href, ...props }: ButtonProps) {
	const classes = `${styles.button} ${className}`

	if (href) {
		return (
			<a className={classes} href={href} target="_blank" rel="noopener noreferrer" {...props}>
				{children}
			</a>
		)
	}

	return (
		<button type="button" className={classes} {...props}>
			{children}
		</button>
	)
}
