import { ButtonHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type button = ButtonHTMLAttributes<HTMLButtonElement>

export function ButtonPrimary({ className, children, ...rest }: button) {
    return (
        <button className={twMerge("bg-blue-600 text-white p-2 py-1 hover:bg-blue-700 text-base rounded-md caret-transparent", className)} {...rest}>
            {children}
        </button >
    )
}

export function ButtonSuccess({ className, children, ...rest }: button) {
    return (
        <button className={twMerge("bg-green-600 text-white px-1 py-1 hover:bg-green-700 text-base rounded-md caret-transparent", className)} {...rest}>
            {children}
        </button >
    )
}

export function ButtonSecondary({ className, children, ...rest }: button) {
    return (
        <button className={twMerge("bg-zinc-600 text-white p-2 py-1 hover:bg-zinc-700 text-base rounded-md caret-transparent", className)} {...rest}>
            {children}
        </button >
    )
}

export function ButtonWarning({ className, children, ...rest }: button) {
    return (
        <button className={twMerge("bg-yellow-600 text-white p-2 py-1 hover:bg-yellow-700 text-base rounded-md caret-transparent", className)} {...rest}>
            {children}
        </button >
    )
}

export function ButtonDanger({ className, children, ...rest }: button) {
    return (
        <button className={twMerge("bg-red-600 text-white p-2 py-1 hover:bg-red-700 text-base rounded-md caret-transparent", className)} {...rest}>
            {children}
        </button >
    )
}