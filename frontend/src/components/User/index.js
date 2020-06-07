import './style.scss';
import React, {Fragment} from "react";
import {Header} from "../Header";

export const User = (props) => {
    return (
        <Fragment>
            <Header/>
            <div className="container pd-50">
                <div className="df jcsb">
                    <div className="user__mock"/>
                    <div className="user__side">
                        <div className="user__label">Проекты могут быть вам интересны</div>
                        <div className="user__card" onClick={() => props.history.push("/voiting")} style={{backgroundImage: `url(/static/card_1.png)`}}/>
                        <div className="user__card" style={{backgroundImage: `url(/static/card_2.png)`}}/>
                        <div className="user__card" style={{backgroundImage: `url(/static/card_3.png)`}}/>
                        <div className="user__card" style={{backgroundImage: `url(/static/card_4.png)`}}/>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}
