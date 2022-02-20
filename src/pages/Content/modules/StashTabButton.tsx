import React from 'react';

export type StashTabButtonProps = React.ComponentProps<'button'> & {
    active: boolean;
    backgroundActive: string;
    backgroundInactive: string;
    x: string | number;
    y: string | number;
    width: string | number;
    height: string | number;
    href?: string;
}

export const StashTabButton = ({
    active,
    backgroundActive,
    backgroundInactive,
    className,
    style,
    x,
    y,
    width,
    height,
    href,
    onClick,
    ...props
}: StashTabButtonProps) =>
    React.createElement(href? 'a' : 'button', {
        className: [
            className,
            'stash-tab-button',
        ].filter(Boolean).join(' '),
        href,
        style: {
            ...{
                '--background-image-active': `url(${backgroundActive})`,
                    '--background-image-inactive': `url(${backgroundInactive})`,
            } as React.CSSProperties,
            left: x,
            top: y,
            width,
            height,
            ...style,
        },
        onClick: (event) => {
            // Don't reload if on the same page and only changing tab query string
            if (href?.split('?')?.[0] === window.location.pathname) {
                event.preventDefault();
            }
            onClick?.(event);
        },
        ...props
    });
