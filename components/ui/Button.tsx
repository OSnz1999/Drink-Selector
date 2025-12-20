import * as React from "react"
import { clsx, type ClassValue } from "clsx"
import styles from "./Button.module.css"

function cn(...inputs: ClassValue[]) {
    return clsx(inputs)
}

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "destructive"
    size?: "sm" | "default" | "lg" | "icon"
    fullWidth?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "default", fullWidth = false, ...props }, ref) => {
        return (
            <button
                className={cn(
                    "btn", // Global class
                    styles.button,
                    styles[variant],
                    styles[size],
                    fullWidth && styles.fullWidth,
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
