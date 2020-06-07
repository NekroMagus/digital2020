import React, {Fragment} from 'react';
import './style.scss';
import {withRouter} from 'react-router-dom';
import {Header} from "../../components/Header";
import Auth from "../../components/Auth";

export default class Main extends React.Component {
	render() {
		return (
			<Fragment>
				<Header rightIconStyles={{width: 110, height: 50}} withRightIcon={'/static/4d1f9ac60a55c076f24ad1d7aebef6f5.png'}/>
				<div className="main__entry">
					<div className="main__entry-item">
						<div className="main__entry-title">Добро пожаловать в Город открытий</div>
						<div className="main__entry-subtitle"><p>Увлекательные образовательные  путешествия для школьников</p>
							<p>Зникомство с инновационными отраслями и индустриями</p>
							<p>Возможность научиться открывать новые ресурсы в себе и пространстве города</p></div>
					</div>
					<div className="main__entry-item">
						<Auth {...this.props} />
					</div>
				</div>
				<div className='main__content' />
			</Fragment>
		)
	}
}
