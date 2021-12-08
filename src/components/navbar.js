import React from "react";
import NavbarItem from './navbarItem'
import AuthService from "../app/service/authService";

const deslogar = () => {
  AuthService.removerUsuarioAutenticado()
}

const isUsuarioAutenticado = () => {
  return AuthService.isUsuarioAutenticado()
}

function Navbar(){
    return (
      <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
      <div className="container">
        <a href="#/home" className="navbar-brand">Minhas Finanças</a>
        
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav">
            <NavbarItem render={isUsuarioAutenticado()} href="#/home" label="Home"/>
            <NavbarItem render={isUsuarioAutenticado()} href="#/cadastro-usuarios" label="Usuarios"/>
            <NavbarItem render={isUsuarioAutenticado()} href="#/consulta-lancamentos" label="Lancamentos"/>
            <NavbarItem onClick={deslogar} render={isUsuarioAutenticado()} href="#/login" label="Sair"/>        
        </ul>
        </div>
      </div>
    </div>
    )
}

export default Navbar;

