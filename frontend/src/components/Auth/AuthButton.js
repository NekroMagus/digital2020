import React, {Fragment} from 'react';

const AuthButton = ({ name, title, color, width, onRadioChange}) => (
    <Fragment>
        <input onChange={onRadioChange} className='auth-button' type="radio" id={name} name='radios' value={name}/>
        <label style={{border: `2px solid ${color}`, width: width}} htmlFor={name}>{title}</label>
    </Fragment>
)

export default AuthButton
