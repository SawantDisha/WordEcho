import { ReactNode } from "react";

interface Props {
    condition?: boolean
    children: ReactNode
    fallback?: ReactNode
}

export default function Visibility({ condition, children, fallback }: Props) {
    return <>
        {condition ? <>{children}</> : <>{fallback}</>}
    </>
}