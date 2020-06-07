import React, {Fragment} from 'react';
import {Header} from "../Header";
import './style.scss';
import {Input} from "../FormControls/Input";
import {DatePicker, Dropdown, RadioButton, TextField, Theme, Button} from "@liquid-design/liquid-design-react";
import {work} from "./work";
import {GroupSelect} from "../GroupSelect";
import {apiCall} from "../../services/api";
import {ROOT_API} from "../../services/constants";
import ModalReferral from "./ModalReferral";

const region = [{id: '0', name: 'Республика Алтай'}]

const cases = ['балл', 'балла', 'баллов'];

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            patronymic: '',
            password: '',
            city: '',
            street: '',
            email: '',
            name: '',
            school: '',
            thirdName: '',
            studyYear: '',
            projectDescription: '',
            description: '',
            gender: '',
            information: '',
            place: '',
            position: '',
            postCode: '',
            vkLink: '',
            youtubeLink: '',
            instagramLink: '',
            twitterLink: '',
            facebookLink: '',
            points: 0,
            rating: '',
            isPassVisible: true,
            isModalOpen: false
        }
    }

    componentDidMount() {
        apiCall("get", `${ROOT_API}profile`).then(data =>
            Object.entries(data).forEach(([key, value]) => {
                console.log(key, value)
                if (this.state.hasOwnProperty(key) && value) {
                    this.setState({
                        [key]: value
                    })
                }
            })
        )
    }

    onSubmit = () => {
        apiCall('PUT', `${ROOT_API}profile`, this.state).then(() => {
            this.props.history.push("/user");
        })
    }

    onInputChange = ({target}) => {
        this.setState({
            [target.name]: target.value
        });
    };

    onInfoChange = (data) => {
        this.setState({
            information: data
        });
    };

    onProjectsChange = (data) => {
        this.setState({
            projectDescription: data
        });
    };

    onHandleRadioClick = (ev) => () => {
        this.setState({
            gender: ev
        })
    }

    onToggleVisibilityChange = () => {
        this.setState({
            isPassVisible: !this.state.isPassVisible
        })
    }

    num2str(n, text_forms) {
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

    onToggleModal = () => {
        this.setState({
            ...this.state,
            isModalOpen: !this.state.isModalOpen
        });
    };

    closeModal = () => {
        this.setState({
            ...this.state,
            isModalOpen: false
        });
    };


    render() {
        return (<Fragment>
                <Header/>
                <div className="container">
                    <Theme themeName='vibrantCyan'>
                        <div className="profile-title">Заполните ваш профиль</div>
                        <div style={{marginBottom: '120px'}} className="df pr">
                            <div className="profile__col">
                                <div className="df jcsb">
                                    <div className="profile__photo"/>
                                    <div className="profile__name">
                                        <Input style={{width: '325px', marginBottom: '20px'}} label='Имя*'
                                               name='firstName'
                                               onChange={this.onInputChange} value={this.state.firstName}/>
                                        <Input style={{width: '325px', marginBottom: '20px'}} label='Фамилия*'
                                               name='lastName'
                                               onChange={this.onInputChange} value={this.state.lastName}/>
                                    </div>
                                </div>
                                <Input readOnly={true} label='Эл. почта' name='email' value={this.state.email}/>
                                <div style={{marginBottom: '50px'}} className="df jcsb">
                                    <Input readOnly={this.state.isPassVisible}
                                           style={{width: '250px', marginBottom: '20px'}}
                                           label='Пароль*' type='password'
                                           name='pass'
                                           onChange={this.onInputChange} value={this.state.pass}/>
                                    <label className="toggler">
                                        <input type="checkbox" onChange={this.onToggleVisibilityChange}/>
                                        <span>Редактировать</span>
                                    </label>
                                </div>
                                <div className="df jcsb">
                                    <Input style={{width: '241px', marginBottom: '20px'}} label='Отчество*'
                                           name='patronymic'
                                           onChange={this.onInputChange} value={this.state.patronymic}/>
                                    <DatePicker withCalendar startDateLabel='Дата рождения'/>
                                </div>
                                <div style={{marginBottom: '20px'}} className="df jcsb aic">
                                    <div className="df jcsb aic" style={{paddingTop: '10px', width: '241px'}}>
                                        <RadioButton isSelected={this.state.sex === 0}
                                                     onClick={this.onHandleRadioClick(0)}
                                                     label='Мужской'/>
                                        <RadioButton isSelected={this.state.sex === 1}
                                                     onClick={this.onHandleRadioClick(1)}
                                                     label='Женский'/>
                                    </div>
                                    <Dropdown style={{backgroundColor: '#f8f8fc'}} label='Социальное положение'
                                              options={work}/>
                                </div>
                                <div style={{marginBottom: '50px'}} className="df jcsb">
                                    <Input style={{width: '241px', marginBottom: '20px'}} label='Место работы'
                                           name='place'
                                           onChange={this.onInputChange} value={this.state.place}/>
                                    <Input style={{width: '241px', marginBottom: '20px'}} label='Должность'
                                           name='position'
                                           onChange={this.onInputChange} value={this.state.position}/>
                                </div>
                                <div className="profile__subtitle">Адрес</div>
                                <div className="df jcsb">
                                    <Input style={{width: '241px', marginBottom: '20px'}} label='Индекс'
                                           name='postCode'
                                           onChange={this.onInputChange} value={this.state.postCode}/>
                                    <div style={{paddingTop: '20px'}}>

                                        <Dropdown defaultValue={region[0]}
                                                  style={{backgroundColor: '#f8f8fc', height: '40px'}}
                                                  options={region}/>
                                    </div>
                                </div>
                                <div style={{marginBottom: '50px'}} className="df jcsb">
                                    <Input style={{width: '241px', marginBottom: '20px'}} label='Город'
                                           name='city'
                                           onChange={this.onInputChange} value={this.state.city}/>
                                    <Input style={{width: '241px', marginBottom: '20px'}} label='Улица'
                                           name='street'
                                           onChange={this.onInputChange} value={this.state.street}/>
                                </div>
                                <div className="profile__subtitle">Контакты</div>
                                <div className="df jcsb">
                                    <Input style={{width: '235px', marginBottom: '20px'}} label='Телефон'
                                           name='phone'
                                           onChange={this.onInputChange} value={this.state.phone}/>
                                    <div className="df jcsb">
                                        <div className="profile__social"
                                             style={{backgroundImage: `url(/static/auth/vkicon.png)`}}></div>
                                        <Input style={{width: '202px', marginBottom: '20px'}} label='Вконтакте'
                                               name='vkLink'
                                               onChange={this.onInputChange} value={this.state.vkLink}/>
                                    </div>
                                </div>
                                <div className="df jcsb">
                                    <div className="df jcsb">
                                        <div className="profile__social"
                                             style={{backgroundImage: `url(/static/auth/yt.png)`}}></div>
                                        <Input style={{width: '202px', marginBottom: '20px'}} label='Youtube'
                                               name='youtubeLink'
                                               onChange={this.onInputChange} value={this.state.youtubeLink}/>
                                    </div>
                                    <div className="df jcsb">
                                        <div className="profile__social"
                                             style={{backgroundImage: `url(/static/auth/insta.png)`}}></div>
                                        <Input style={{width: '202px', marginBottom: '20px'}} label='Instagram'
                                               name='instagramLink'
                                               onChange={this.onInputChange} value={this.state.instagramLink}/>
                                    </div>
                                </div>
                                <div className="df jcsb">
                                    <div className="df jcsb">
                                        <div className="profile__social"
                                             style={{backgroundImage: `url(/static/auth/tw.png)`}}/>
                                        <Input style={{width: '202px', marginBottom: '20px'}} label='Twitter'
                                               name='twitterLink'
                                               onChange={this.onInputChange} value={this.state.twitterLink}/>
                                    </div>
                                    <div className="df jcsb">
                                        <div className="profile__social"
                                             style={{backgroundImage: `url(/static/auth/FBicon.png)`}}/>
                                        <Input style={{width: '202px', marginBottom: '20px'}} label='Facebook'
                                               name='facebookLink'
                                               onChange={this.onInputChange} value={this.state.facebookLink}/>
                                    </div>
                                </div>
                                <Button onClick={this.onToggleModal} style={{width: '246px', background:'#FFC832', color:'#0F69AF'}} size='big'>Пригласить друга</Button>
                                <ModalReferral
                                    isModalOpen={this.state.isModalOpen}
                                    closeModal={this.closeModal}
                                    userId={this.state.id}
                                />
                            </div>
                            <div style={{marginLeft: '65px'}} className="profile__col">
                                <TextField
                                    style={{width: '100%'}}
                                    label='Информация'
                                    placeholder='Расскажите о себе и ваших достижениях подробно. Это поможет привлечь больше соратников к вашему проекту'
                                    grey onChange={this.onInfoChange} value={this.state.information} multiline/>
                                <Input placeholder='Кратко напишите о себе'
                                       label='Краткая информация которая будет отображаться под вашим фото'
                                       name='description'
                                       onChange={this.onInputChange} value={this.state.description}/>
                                <TextField
                                    style={{width: '100%'}}
                                    label='Реализованные проекты на в рамках платформы «Лидеры Алтая»'
                                    placeholder='Расскажите в каких проектов вы участвовали ренее и каких результатов удалось достичь'
                                    grey onChange={this.onProjectsChange} value={this.state.projectDescription}
                                    multiline/>
                                <div className='df jcfe'>
                                    <Button style={{width: '246px'}} size='big'>Создать проект</Button>
                                </div>
                                <div className="profile__subtitle">Адрес</div>
                                <GroupSelect/>
                                <div className='df jcfe'>
                                    <Button onClick={this.onSubmit} style={{width: '246px'}}
                                            size='big'>Сохранить</Button>
                                </div>
                            </div>
                            <div className="profile__sidebar">
                                <div className="profile__sidebar-avatar"/>
                                <div className="profile__sidebar-name">{this.state.rating}</div>
                                <div className="profile__sidebar-info">отсталось набрать 100 баллов до статуса «Лидер
                                    мнений»
                                </div>
                                <div className="profile__sidebar-counter">{this.state.points}</div>
                                <div
                                    className="profile__sidebar-counter-text">{`${this.num2str(this.state.points, cases)} вы заработали`}</div>
                            </div>
                        </div>
                    </Theme>
                </div>

            </Fragment>
        )
    }
}

export default Profile;
