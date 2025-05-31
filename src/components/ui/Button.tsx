import type React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}
export const Button = ({
	leftIcon,
	children,
	rightIcon,
	...props
}: ButtonProps) => {
	return (
		<button {...props}>
			{leftIcon && <span>{leftIcon}</span>}
			{children}
			{rightIcon && <span>{rightIcon}</span>}
		</button>
	);
};
