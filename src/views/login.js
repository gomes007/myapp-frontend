import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class Login extends React.Component {

    state = {
        email:'',
        senha: '',
        mensagemErro: null
    }

    entrar = () => {
        axios
          .post('http://localhost:8080/api/usuarios/autenticar', {
            email: this.state.email,
            senha: this.state.senha
          }).then(response => {
            this.props.history.push('/home')
          }).catch(error =>{
            this.setState({mensagemErro: error.response.data})
          })
    }


    prepareCadastrar = () => {
      this.props.history.push('/cadastro-usuarios')
    }




  render() {
    return (
      <div className="col-md-4" style={{ position: "relative", left: "400px", top: "200px" }}>
        
          <Card title="Login">
            <span>{this.state.mensagemErro}</span>              
            <FormGroup label="Email:" htmlFor="inputEmail">
                <input type="text" className="form-control" id="inputEmail" value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
            </FormGroup>
        
            <FormGroup label="Senha:" htmlFor="inputPassword">
                <input type="password" className="form-control" id="inputPassword" value={this.state.senha} onChange={e => this.setState({senha: e.target.value})}/>
            </FormGroup>
            <br/>
            <button onClick={this.entrar} className="btn btn-primary btn-space medium-btn" >Entrar</button>
            <button onClick={this.prepareCadastrar} className="btn btn-info medium-btn">Cadastrar</button>
          </Card>
        </div>
      
    );
  }
}

export default withRouter(Login)
