import React, { ButtonHTMLAttributes }  from 'react';
import '../styles/Button.scss';

interface ButtonInterface extends ButtonHTMLAttributes<HTMLButtonElement> {
    activate?: string | undefined;
    clicked?: string | undefined;
}

export function Button(props: ButtonInterface) {
    return (
        <button className="button" { ...props } />
    )
}