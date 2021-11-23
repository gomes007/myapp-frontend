import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";

class Login extends React.Component {

    state = {
        email:'',
        senha: ''
    }

    entrar = () => {
        console.log('email: ', this.state.email)
        console.log('senha: ', this.state.senha)
    }



  render() {
    return (
      <div className="col-md-4 card mb-3" style={{ position: "relative", left: "500px", top: "200px" }}>
        <div className="container">
          <Card title="Login">              
            <FormGroup label="Email:" htmlFor="inputEmail">
                <input type="text" className="form-control" id="inputEmail" value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
            </FormGroup>
        
            <FormGroup label="Senha:" htmlFor="inputPassword">
                <input type="password" className="form-control" id="inputPassword" value={this.state.senha} onChange={e => this.setState({senha: e.target.value})}/>
            </FormGroup>
            <br/>
            <button onClick={this.entrar} className="btn btn-primary btn-space medium-btn" >Entrar</button>
            <button className="btn btn-info medium-btn">Cadastrar</button>
          </Card>
        </div>
      </div>
    );
  }
}

export default Login;
