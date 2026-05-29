// clsx is a utility for constructing className strings conditionally. 
// It allows us to combine multiple class names and apply them based on certain conditions.
import clsx from "clsx";

type HeadingProps = {
    children: React.ReactNode;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    className ?: string;
}

export default function Heading({ children, level = 1, className }: HeadingProps) {

    // ElementType allows us to use a string like 'h1', 'h2', etc. 
    // to create the appropriate heading element
    const Tag: React.ElementType = `h${level}`;

    // Record is a TypeScript utility type that creates an 
    // object type with specified keys and values.
    const sizeMap: Record<number, string> = {
        1: 'text-4xl',
        2: 'text-3xl',
        3: 'text-2xl',
        4: 'text-xl',
        5: 'text-lg',
        6: 'text-sm',
    }

    return (
        <Tag
            className={clsx("font-black uppercase", sizeMap[level], className)}
        >
            {children}
        </Tag>
    )
}
