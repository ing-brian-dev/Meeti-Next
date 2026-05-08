export const currentPath = (href: string, pathname: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
}

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}