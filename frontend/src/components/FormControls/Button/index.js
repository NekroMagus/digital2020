import React from 'react'
import './style.scss'

const Button = ({title, type, style, classes}) => (
    <button className={`btn ${classes}`} type={type} style={style}>
        {title}
    </button>
);

export default Button;
