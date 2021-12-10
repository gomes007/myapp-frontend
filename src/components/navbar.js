import React from "react";
import NavbarItem from './navbarItem'
import AuthService from "../app/service/authService";
import {AuthConsumer} from '../main/provedorAutenticacao'


// eslint-disable-next-line
const deslogar = () => {
  AuthService.removerUsuarioAutenticado()
}


// eslint-disable-next-line
const isUsuarioAutenticado = () => {
  return AuthService.isUsuarioAutenticado()
}

function Navbar(props){
    return (
      <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
      <div className="container">
        <a href="#/home" className="navbar-brand">Minhas Finanças</a>
        
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav">
            <NavbarItem render={props.isUsuarioAutenticado} href="#/home" label="Home"/>
            <NavbarItem render={props.isUsuarioAutenticado} href="#/cadastro-usuarios" label="Usuarios"/>
            <NavbarItem render={props.isUsuarioAutenticado} href="#/consulta-lancamentos" label="Lancamentos"/>
            <NavbarItem onClick={props.deslogar} render={props.isUsuarioAutenticado} href="#/login" label="Sair"/>        
        </ul>
        </div>
      </div>
    </div>
    )
}

// eslint-disable-next-line
export default () => (
  <AuthConsumer>
      {(context) => (<Navbar isUsuarioAutenticado={context.isUsuarioAutenticado} deslogar={context.encerrarSessao}/>)}
  </AuthConsumer>
)

// quando nao for classe usa o modelo acima, ou seja, nao funciona Navbar.contextType = AuthContext

