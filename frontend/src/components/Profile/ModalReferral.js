import React from "react";
import close from '../../static/Path_close.svg';
import Input from "@material-ui/core/Input";
import twitter from '../../static/auth/tw.png';
import facebook from '../../static/auth/FBicon.png';
import instaram from '../../static/auth/insta.png';
import vk from '../../static/auth/vkicon.png';
import copy from '../../static/copy.svg';

const ModalReferral = ({isModalOpen, closeModal, userId}) => {
  if (!isModalOpen) {
    return null;
  }

  return (
      <div className={'modal'}>
        <div className={'modal-top'}>
          <img onClick={closeModal} className={'modal-close'} src={close} alt={'x'}/>
        </div>
        <div className={'modal-title'}>
          <h1>Ваша реферальная ссылка</h1>
        </div>
        <div className={'modal-text'}>
          <p>
            Получите +20 баллов за каждого друга, который пройдет по ссылке и зарегистрируется на проекте
          </p>
        </div>
        <div>
          <Input className={'modal-input'} style={{width: 400}} type={'text'}
                 value={"http://89.223.88.252:8800/#/ref/" + userId}>as</Input>
        </div>
        <div className={'modal-img-div'}>
          <img className={'modal-img'} src={twitter} alt={'twitter'}/>
          <img className={'modal-img'} src={facebook} alt={'facebook'}/>
          <img className={'modal-img'} src={instaram} alt={'instaram'}/>
          <img className={'modal-img'} src={vk} alt={'vk'}/>
          <img className={'modal-img'} src={copy} alt={'copy'}/>
        </div>
      </div>
  );
};

export default ModalReferral;