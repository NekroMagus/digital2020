import React from 'react';
import './style.scss';
import Auth from "../../components/Auth";

export default class AuthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegister: false
        }
    }

    toggleReg = () => {
        this.setState({
            isRegister: true
        })
    }
    render() {
        return (
            <div className="auth-page">
                <div className="container">
                    <div className="auth-page__entry">
                        <div className="auth-page__entry-item">
                            <div className="auth-page__entry-title">Лидеры
                                Алтая
                            </div>
                            <div className="auth-page__entry-subtitle">Приветствуем тебя в самом большом сообществе лидеров
                                общественного мнения России
                            </div>
                        </div>
                        <div className="auth-page__entry-item">
                            <Auth callbackFromParent={this.toggleReg} {...this.props} />
                        </div>
                    </div>
                    <div className={`auth-page__content ${this.state.isRegister ? 'auth-page__content-reg' : ''}`}/>
                </div>
            </div>
        )
    }
}
