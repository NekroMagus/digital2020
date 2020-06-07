import React, {Fragment} from 'react';
import './style.scss';
import {Input} from '../FormControls/Input';
import {validationText} from '../../services/validation'
import Button from "../FormControls/Button";
import {NavLink, withRouter} from "react-router-dom";
import VkLogin from "react-vkontakte-login";


class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refId: null,
            isSignIn: true,
            type: '',
            firstName: '',
            lastName: '',
            email: '',
            pass: '',
            confirmPass: '',
            isErrorShow: false,
            validEmail: '',
            validPass: '',
        };
        const id = this.props.match.params.id;
        if (id)  {
            this.state.refId = id;
        }
    }

    onInputChange = ({target}) => {
        this.setState({
            [target.name]: target.value
        }, () => {
            if (this.state.isErrorShow) {
                this.validText();
            }
        });
    };

    validText = () => {
        const {email, pass} = this.state;
        this.setState({
            validPass: pass.length < 6 ? validationText.wrongPassword : '',
            validEmail: !/\S+@\S+\.\S+/.test(email) ? validationText.wrongEmail : '',
        })
    };

    onSubmit = (ev) => {
        ev.preventDefault();
        const {firstName, lastName, confirmPass, pass, email} = this.state;
        const isValid = this.state.isSignIn ? email && pass : email && firstName && lastName && pass && confirmPass === pass;
        if (isValid) {
            const path = this.state.isSignIn ? 'auth' : 'auth/registration';
            const data = this.state.isSignIn ? {
                email: this.state.email,
                password: this.state.pass,
            } : {
                email: this.state.email,
                password: this.state.pass, firstName: this.state.firstName,
                lastName: this.state.lastName, refId: this.state.refId
            };
            this.props
                .onAuth(path, data)
                .then((data) => {
                    this.props.history.push("/profile");
                })
                .catch(() => {
                    return;
                });
        }

    };

    onToggleChange = () => {
        this.props.callbackFromParent(true);
        this.setState({
            isSignIn: false
        })
    }

    onRadioChange = ev => {
        this.setState({
            type: ev.target.value
        })
    }

    checkChange = () => {
        return 1
    }

    authVK = response => {
        this.props.onAuth('auth/vk', response)
            .then(data => {
                this.props.history.push("/profile");
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        const signIn = <Fragment>
            <Input validText={this.state.validEmail} label='Адрес эл. почты' name='email' onChange={this.onInputChange}
                   value={this.state.email}/>
            <Input validText={this.state.validPass} label='Пароль' name='pass' type='password'
                   onChange={this.onInputChange} value={this.state.pass}/>
            <div className="df jcsb">
                <div className="auth__forgot" onClick={this.onToggleChange}>Я новый пользователь</div>
                <div className="auth__forgot">Забыли пароль</div>
            </div>
            <div className="df jcsb">
                {/*<FilterCheckbox onCheckChange={() => this.checkChange} name='remember' label='Запомнить меня'/>*/}
                <div className='auth__social to-right'>
                    <div className="auth__social-title">Авторизоваться через соц. сеть</div>
                    <div className="auth__social-list">
                        <VkLogin
                            apiId="7501915"
                            callback={this.authVK}
                            {...this.props}
                            render={renderProps => (
                                <button onClick={renderProps.onClick}><img src="static/auth/vkicon.png" alt=""/></button>
                            )}
                        />
                        <img src="static/auth/FBicon.png" alt=""/>
                    </div>
                </div>
            </div>
        </Fragment>;
        const signUp = <Fragment>
            <div className="df jcsb">
                <Input style={{width: '235px', marginBottom: '20px'}} label='Имя*' name='firstName'
                       onChange={this.onInputChange}
                       value={this.state.firstName}/>
                <Input style={{width: '235px', marginBottom: '20px'}} label='Фамилия*' name='lastName'
                       onChange={this.onInputChange}
                       value={this.state.lastName}/>
            </div>
            <Input label='Адрес эл. почты*' name='email'
                   onChange={this.onInputChange}
                   value={this.state.email}/>
            <div className="df jcsb">
                <Input style={{width: '235px', marginBottom: '20px'}} label='Пароль*' name='pass' type='password'
                       onChange={this.onInputChange} value={this.state.pass}/>
                <Input style={{width: '235px', marginBottom: '20px'}} label='Подтвердите пароль*' name='confirmPass'
                       type='password'
                       onChange={this.onInputChange} value={this.state.confirmPass}/>
            </div>
            <div className="df jcsb">
                {/*<FilterCheckbox onCheckChange={() => this.checkChange} name='remember' label='Я согласен с условиями конфиденциальности'/>*/}
                <div className='auth__social to-right'>
                    <div className="auth__social-title">Авторизоваться через соц. сеть</div>
                    <div className="auth__social-list">
                        <VkLogin
                            apiId="7501915"
                            callback={this.authVK}
                            {...this.props}
                            render={renderProps => (
                                <button onClick={renderProps.onClick}><img src="static/auth/vkicon.png" alt=""/></button>
                            )}
                        />
                        <img src="static/auth/FBicon.png" alt=""/>
                    </div>
                </div>
            </div>
        </Fragment>;
        const confirmButtonText = this.state.isSignIn ? 'Войти' : 'Зарегистрироваться';
        return <div className='auth'>
            <div className="auth__title">Добро пожаловать</div>
            <form onSubmit={this.onSubmit} className="auth__form">
                {this.state.isSignIn
                    ? signIn
                    : signUp}
                <div style={this.state.isSignIn ? {} : {justifyContent: 'flex-end'}} className='auth__bottom'>
                    <Button classes='to-right mt-20' style={{justifySelf: 'right'}} type='submit'
                            title={confirmButtonText}/>
                </div>
            </form>
        </div>
    }
}

export default withRouter(Auth);