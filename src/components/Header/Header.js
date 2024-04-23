import React from 'react';
import './Header.scss';

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
        <img src={require('../../assets/icons/user-icon.svg')}></img>
      </div>
    </div>
  );
}

export default Header;
