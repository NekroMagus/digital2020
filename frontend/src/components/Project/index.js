import React, {Fragment} from "react";
import './style.scss';
import {Header} from "../Header";
import {Theme} from "@liquid-design/liquid-design-react";
import {Input} from "../FormControls/Input";
import {apiCall} from "../../services/api";
import {ROOT_API} from "../../services/constants";

export default class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
        }
        // "projectType": "Социальный проект",
        //     "shortDescription": "asdaaf",
        //     "description": "fda",
        //     "category": [
        //     "ЖКХ"
        // ],
        //     "resources": "Money",
        //     "thanks": "no no no",
        //     "deadline": "2020.02.20"
    }

    onSubmit = () => {
        apiCall('PUT', `${ROOT_API}profile`, this.state).then(data => console.log(data))
    }

    onInputChange = ({target}) => {
        this.setState({
            [target.name]: target.value
        });
    };

    render() {
        return (
            <Fragment>
                <Header/>
                <div className="container">
                    <Theme themeName='vibrantCyan'>
                        <div className="profile-title">Карточка проекта</div>
                        <div style={{marginBottom: '120px'}} className="df pr">
                            <div className="profile__col">
                                <Input label='Название проекта'
                                       name='title'
                                       onChange={this.onInputChange} value={this.state.title}/>
                            </div>
                        </div>
                    </Theme>
                </div>
            </Fragment>
        )
    }
}
