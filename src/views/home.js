import React from "react";
import {withRouter} from 'react-router-dom'
import UsuarioService from "../app/service/usuarioService";
import {AuthContext} from '../main/provedorAutenticacao'

class Home extends React.Component {


    state = {
        saldo: 0
    }

    constructor(){
      super();
      this.usuarioService = new UsuarioService()
    }


    componentDidMount(){      
      const usuarioLogado = this.context.usuarioAutenticado
      this.usuarioService
        .obterSaldoPorUsuario(usuarioLogado.id)
        .then(response =>{
          this.setState({saldo: response.data})
        }).catch(error => {
          console.log(error.response)
        })
    }


  render() {
    return (
      <div className="jumbotron" style={{ position: "relative", left: "300px", top: "100px" }}>
        <h1 className="display-3">Bem vindo!</h1>
        <p className="lead">Esse é seu sistema de finanças.</p>
        <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
        <hr className="my-4" />
        <p>
          E essa é sua área administrativa, utilize um dos menus ou botões
          abaixo para navegar pelo sistema.
        </p>
        <p className="lead">
          <a
            className="btn btn-primary btn-lg btn-space"
            href="#/cadastro-usuarios"
            role="button">
            <i className="fa fa-users"></i>
            Cadastrar Usuário
          </a>
          <a
            className="btn btn-danger btn-lg"
            href="#/cadastro-lancamentos"
            role="button">
            <i className="fa fa-users"></i>
            Cadastrar Lançamento
          </a>
        </p>
      </div>
    );
  }
}

Home.contextType = AuthContext

export default withRouter (Home);
