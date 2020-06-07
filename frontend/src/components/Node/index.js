import React from 'react';
import {ProgressRing} from '../ProgressRing';
import './style.scss';

export const Node = (props) => {
	const { radius, stroke, progress, title, isLast } = props;
	return (<div className={`node ${isLast ? 'last' : ''}`}>
		<div className="node__circle">
			<ProgressRing radius={radius || 40}
										stroke={stroke || 4}
										progress={progress}/>
			{!isLast ?
			<div className="node__link" />
				: ''}
		</div>
		<div className="node__title">{title}</div>
	</div>)
};