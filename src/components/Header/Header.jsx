import React from 'react';
import './Header.scss';
import UserIcon from '../../assets/icons/user-icon.svg';

function Header() {
  return (
    <div className="home">
      <div className="nav-container">
        <div className="nav-item">Главная</div>
        <div className="nav-item">Пользователи</div>
        <div className="nav-item">Игры</div>
        <div className="nav-item">Тесты</div>
      </div>
      <div className="user-profile">
        <img src={UserIcon}></img>
      </div>
    </div>
  );
}

export default Header;
