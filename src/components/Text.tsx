import type { ReactNode } from "react";

interface TextProps {
    children: ReactNode;
    variant?: 'primary' | 'secondary';
}

export function Text({children, variant = 'primary'}: TextProps){
    const textStyle = {
        primary: "text-lg font-normal text-white text-body lg:text-xl",
        secondary: "mb-3 text-body"
    }

    return (
        <p className={`inline-blok, ${textStyle[variant]}`}>
            {children}
        </p>
    )
}
