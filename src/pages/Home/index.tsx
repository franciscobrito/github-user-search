import ButtonGlobal from 'core/components/ButtonGlobal';
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Home = () => (
  <div className="home-container">
    <h1 className="home-text-title">
      Desafio do Capítulo 3, <br /> Bootcamp DevSuperior
    </h1>
    <p className="home-text-subtitle">
      Bem-vindos ao desafio do capítulo 3 do Bootcamp DevSuperior. <br />

      Favor observar as instruções passadas no capítulo sobre a elaboração <br /> deste projeto. <br />

      Este design foi adaptado a partir de Ant Design System for Figma, de <br /> Mateusz Wierzbicki: <span className="home-text-mail">antforfigma@gmail.com</span>
    </p>
    <Link to="/search" className="home-btn">
      <ButtonGlobal text="Começar" />
    </Link>
  </div>
);

export default Home;
