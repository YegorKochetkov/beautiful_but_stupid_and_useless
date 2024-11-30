import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	children?: React.ReactNode;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
};

const Button = ({ leftIcon, children, rightIcon, ...props }: ButtonProps) => {
	return (
		<button {...props}>
			{leftIcon && <span>{leftIcon}</span>}
			{children}
			{rightIcon && <span>{rightIcon}</span>}
		</button>
	);
};

export default Button;
