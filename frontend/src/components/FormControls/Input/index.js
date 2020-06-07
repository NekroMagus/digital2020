import React from 'react';
import './style.scss';

export const Input = ({label, name, onChange, value, style = {marginBottom: '20px'}, type = 'text', inputStyle, disabled = false, validText='', placeholder='', readOnly=false}) => {
	return (
	<label className='label' style={style}>
		{label}
		<input readOnly={readOnly} placeholder={placeholder} disabled={disabled} style={inputStyle} onChange={onChange} value={value} type={type} name={name}
					 className='input'/>
		<span className="validation-text">{validText}</span>
	</label>
)};
