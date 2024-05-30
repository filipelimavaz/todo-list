import React from 'react'
import css from './button.module.css'

const Button = ({ type, onClick, children, className }) => {
    return (
        <button type={type} onClick={onClick} className={className}>
            {children}
        </button>
    );
};

export default Button;