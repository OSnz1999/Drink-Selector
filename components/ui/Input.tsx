import * as React from "react"
import { clsx, type ClassValue } from "clsx"
import styles from "./Input.module.css"

function cn(...inputs: ClassValue[]) {
    return clsx(inputs)
}

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "input", // Global
                    styles.input,
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }
