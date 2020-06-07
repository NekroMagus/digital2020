import './style.scss';
import {Header} from "../Header";
import React, {Fragment} from "react";

export default class Voiting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dislike: 2,
            like: 321,
            current: ''
        }
    }

    onIncrement = (type) => {
        if (this.state.dislike > 2 || this.state.like > 321) return;
        this.setState({
            [type]: this.state[type] + 1,
            current: type
        })
    }

    render() {
        return (
            <Fragment>
                <Header/>
                <div className="container">
                    <div style={{marginBottom: '120px'}} className="df pr">
                        <div className="profile__col">
                            <div className="label">Инициатива органов власти</div>
                            <div style={{marginBottom: '50px'}} className="bold-text">Создание дорожной карты проектов
                                цифровой трансформации для
                                региональных органов
                                государственного управлениям
                            </div>
                            <div className="label">Информация</div>
                            <div style={{marginBottom: '30px'}} className="reg-text">
                                У меня есть мечта сделать маленькую «цифровую Швейцарию» в российском регионе. Недавно,
                                когда я был на обучении по MBA в Москве, коллеги меня дополнили в этой фразе — сказали,
                                что лучше «Сингапур». В Ростовской области уже много сделано, и если попробовать ещё
                                применить новый взгляд и подходы, совместить с идеями, которые сегодня как в России, так
                                и в мире находятся в тренде, с приложением на мощь Ростовской области, то может
                                получиться очень сильная история, в результате которой и выиграют жители региона.
                            </div>
                            <div className="label">Необходимые ресурсы</div>
                            <div className="reg-text">Административные и финансовые ресурсы отраслевых министерств, высшие учебные заведения.</div>
                        </div>
                        <div className="voiting__col">
                            <div className="label">Автор инициативы</div>
                            <div className="df jcsb">
                                <div className="voiting__name">Петров Семен Владимирович</div>
                                <div className="profile__photo"/>
                            </div>
                            <div style={{marginBottom: '360px'}} className="reg-text">Общественный деятель</div>
                            <div className="voiting__vote">Голосовать за проект</div>
                            <div className="df jcsb">
                                <div onClick={this.onIncrement.bind(this, 'dislike')} className={`voiting__btn ${this.state.current}`}>
                                    <div className="df jcsb">
                                        <div className="voiting__icon" />
                                        <div className="voiting__count">{this.state.dislike}</div>
                                    </div>
                                </div>
                                <div onClick={this.onIncrement.bind(this, 'like')} className={`voiting__btn ${this.state.current}`}>
                                    <div className="df jcsb">
                                        <div className="voiting__icon like" />
                                        <div className="voiting__count">{this.state.like}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
