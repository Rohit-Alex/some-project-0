import type { ReactNode, Ref } from "react";
import { useTheme } from "@mui/material/styles";
import { Card, CardContent, CardHeader, Divider } from "@mui/material";

interface MainCardProps {
    border?: boolean
    boxShadow?: boolean
    children?: ReactNode
    subheader?: ReactNode | string
    content?: boolean
    contentClassName?: string
    darkTitle?: boolean
    divider?: boolean
    elevation?: number
    secondary?: ReactNode
    shadow?: string
    className?: string
    title?: ReactNode | string
    ref?: Ref<HTMLDivElement>
}

// React 19: ref is now a regular prop, no need for forwardRef
export default function MainCard({
    border = true,
    boxShadow = false,
    children,
    subheader,
    content = true,
    contentClassName = '',
    darkTitle = false,
    divider = true,
    elevation,
    secondary,
    shadow,
    className = '',
    title,
    ref,
    ...others
}: MainCardProps): ReactNode {
    const theme = useTheme()
    const isDark = theme.palette.mode === 'dark'

    return (
        <Card
            elevation={elevation || 0}
            ref={ref}
            className={`relative rounded-lg ${className}`}
            sx={{
                border: border ? `1px solid ${theme.palette.divider}` : 'none',
                boxShadow: boxShadow && !border ? shadow || theme.shadows[1] : 'inherit',
                ':hover': {
                    boxShadow: boxShadow ? shadow || theme.shadows[2] : 'inherit',
                },
                ...(isDark && {
                    backgroundImage: 'none',
                }),
            }}
                {...others}
            >
            {title && (
                <CardHeader
                    className="p-5"
                    title={title}
                    action={secondary}
                    subheader={subheader}
                    slotProps={{
                        title: { variant: darkTitle ? 'h4' : 'subtitle1' },
                        action: { sx: { m: '0px auto', alignSelf: 'center' } },
                    }}
                />
            )}
            {title && divider && <Divider />}
            {content && <CardContent className={contentClassName}>{children}</CardContent>}
            {!content && children}
        </Card>
    )
};
