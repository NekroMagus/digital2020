import React, {Fragment} from 'react';
import './style.scss';
import {Checkbox} from "@liquid-design/liquid-design-react";


const selects = ['Технологии', 'Культурное наследие', 'Строительство', 'Наука и инновации', 'Медицина', 'Государственные услуги', 'Мой район', 'Туризм', 'Образование', 'Электронный дом', 'Благоустройство', 'Торговля и услуги', 'Социальная сфера', 'Информационные технологии', 'Экология', 'Культура', 'ЖКХ', 'Парки и зеленые зоны', 'Экономика и бизнес', 'Транспорт', 'Ветеринария', 'Спорт', 'Город', 'Городские мероприятия']

export const GroupSelect = () => {
    return (
        <Fragment>
            <div className="group-select__text">Отметьте темы, которые вам наиболее интересны</div>
            <div className='group-select__group'>
                {selects.map((val, idx) => <Checkbox key={idx} label={val}/>)}
            </div>
        </Fragment>
    )};
