interface TitleProps {
    text: string;
    variant?: 'primary' | 'secondary';
}

export function Title({text, variant = 'primary'}: TitleProps) {
    const variantStyle = {
        primary: "pb-2 mb-4 text-3xl font-extrabold md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-emerald-600",
        secondary: "text-xl text-slate-400 italic"
    };

    return (

        <h1 className={`inline-block ${variantStyle[variant]}`}>
            {text}
        </h1>
    );
}
