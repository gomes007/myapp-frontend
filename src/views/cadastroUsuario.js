import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import {withRouter} from 'react-router-dom'
import UsuarioService from "../app/service/usuarioService";
import {mensagemErro, mensagemSucesso} from '../components/toastr'


class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor(){
        super();
        this.service = new UsuarioService()
    }

    validar(){
        const msgs = []

        if (!this.state.nome) {
            msgs.push('campo nome e obrigatorio')
        }

        if (!this.state.email) {
            msgs.push('campo email e obrigatorio')
        } else if (!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            msgs.push('informe email valido')
        }

        if (!this.state.senha || !this.state.senhaRepeticao) {
            msgs.push('digite a senha 2x')
        } else if (this.state.senha !== this.state.senhaRepeticao) {
            msgs.push('as senhas precisam se iguais nos 2 campos')
        }
            
        return msgs;
        
    }

    cadastrar = () => {

        const msgs = this.validar();

        if (msgs && msgs.length > 0) {
            msgs.forEach((msg, index) => {
                mensagemErro(msg)
            })
            return false
        }


        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }
        this.service.salvar(usuario)
        .then(response => {                
                mensagemSucesso('cadastrado com sucesso!')
                this.props.history.push('/login')
            }).catch(error =>{
                mensagemErro(error.response.data)
            })

    }

    cancelar = () => {
        this.props.history.push('/login')
    }

  
  render() {
    return (
    <div className="col-md-5" style={{ position: "relative", left: "400px", top: "100px" }}>
        
          <Card title="Cadastro de Usuarios">      
            <FormGroup label="Nome:" htmlFor="inputNome">
                <input type="text" className="form-control" id="inputNome" name="nome" onChange={e => this.setState({nome: e.target.value})}/>
            </FormGroup>

            <FormGroup label="Email:" htmlFor="inputEmail">
                <input type="text" className="form-control" id="inputEmail" onChange={e => this.setState({email: e.target.value})}/>
            </FormGroup>
        
            <FormGroup label="Senha:" htmlFor="inputPassword">
                <input type="password" className="form-control" id="inputPassword" onChange={e => this.setState({senha: e.target.value})}/>
            </FormGroup>

            <FormGroup label="Repita a Senha:" htmlFor="inputRepitaSenha">
                <input type="password" className="form-control" id="inputRepitaSenha" onChange={e => this.setState({senhaRepeticao: e.target.value})}/>
            </FormGroup>
            <br/>
            <button onClick={this.cadastrar} className="btn btn-success btn-space medium-btn" >Salvar</button>
            <button onClick={this.cancelar} className="btn btn-info medium-btn">Cancelar</button>
          </Card>
          
    </div>
    
    );
  }
}

export default withRouter(CadastroUsuario);