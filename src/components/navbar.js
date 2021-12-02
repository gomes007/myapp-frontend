import React from "react";
import NavbarItem from './navbarItem'


function Navbar(){
    return (
      <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
      <div className="container">
        <a href="#/home" className="navbar-brand">Minhas Finanças</a>
        
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav">
            <NavbarItem href="#/home" label="Home"/>
            <NavbarItem href="#/cadastro-usuarios" label="Usuarios"/>
            <NavbarItem href="#/consulta-lancamentos" label="Lancamentos"/>
            <NavbarItem href="#/login" label="Login"/>        
        </ul>
        </div>
      </div>
    </div>
    )
}

export default Navbar;

