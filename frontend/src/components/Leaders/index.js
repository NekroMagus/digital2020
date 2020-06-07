import './style.scss';
import {Header} from "../Header";
import React, {Fragment} from "react";
import {apiCall} from "../../services/api";
import {ROOT_API} from "../../services/constants";

const cases = ['подписчик', 'подписчика', 'подписчиков'];


export default class Leaders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    num2str = (n, text_forms) => {
        n = Math.abs(n) % 100;
        var n1 = n % 10;
        if (n > 10 && n < 20) {
            return text_forms[2];
        }
        if (n1 > 1 && n1 < 5) {
            return text_forms[1];
        }
        if (n1 === 1) {
            return text_forms[0];
        }
        return text_forms[2];
    }


    componentDidMount() {
        apiCall('GET', `${ROOT_API}leaders/vk`).then(({response}) => {
            const data = response.items.filter(item => !item.is_closed).sort((a, b) => b.followers_count - a.followers_count)
            this.setState({
                data
            })
            console.log(data)
        })
    }

    render() {
        return (
            <Fragment>
                <Header/>
                <div className="container">
                    <div className="leaders__title">Лидеры социальных сетей в Республике Алтай</div>
                    <div className="leaders__container">
                        {this.state.data.map(item => {
                            return <div key={item.id} className='leaders__item'>
                                <div>
                                    <div className="leaders__name">{item.first_name} {item.last_name}</div>
                                    <div style={{marginBottom: '15px'}} className="leaders__text">Горно-Алтайск</div>
                                    <div className="df">
                                        <div className="profile__social"
                                             style={{
                                                 backgroundImage: `url(/static/auth/vkicon.png)`,
                                                 width: '20px',
                                                 height: '20px',
                                                 marginTop: '0',
                                                 marginRight: '10px'
                                             }}></div>
                                        <div className="leaders__text">{item.followers_count} {this.num2str(item.followers_count, cases)}</div>
                                    </div>
                                </div>
                                <div className='leaders__photo'
                                     style={{backgroundImage: `url(${item.photo_max_orig})`}}>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </Fragment>
        );
    }
}
