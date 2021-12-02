import React from "react";
import { withRouter } from "react-router-dom";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from '../../app/service/localStorage'

import * as messages from '../../components/toastr'



class CadastroLancamentos extends React.Component {


  state = {
    id: null,
    usuario: null,
    descricao: '',
    valor: '',
    mes: '',
    ano: '',
    tipo: '',
    status: ''
  }

  constructor(){
    super()
    this.service = new LancamentoService();
}

  //usado tbem para editar registro que vem da tela consultar lancamentos
  componentDidMount(){
    const params = this.props.match.params
    if(params.id){
      this.service.obterPorId(params.id)
          .then(response => {
            this.setState({...response.data})
          }).catch(erros => {
            messages.mensagemErro(erros.response.data)
          })
    }
  }


  handleChange = (event) => {
    const value = event.target.value
    const name = event.target.name

    this.setState({[name]: value})
  }

  submit = () => {

    const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
   
    const {descricao, valor, tipo, mes, ano} = this.state
    const lancamento = {descricao, valor, tipo, mes, ano, usuario: usuarioLogado.id}

    this.service
        .salvar(lancamento)
        .then(response => {
          this.setState({descricao:'', valor:'', tipo:'', mes:'', ano:''}) 
          messages.mensagemSucesso('registro cadastrado com sucesso!')
        })
        .catch(error => {
          messages.mensagemErro(error.response.data)
        })

  }


  atualizar = () => {
       
    const {descricao, valor, tipo, mes, ano, id, usuario, status} = this.state
    const lancamento = {descricao, valor, tipo, mes, ano, id, usuario, status}

    this.service
        .atualizar(lancamento)
        .then(response => {
          this.setState({descricao:'', valor:'', tipo:'', mes:'', ano:''}) 
          messages.mensagemSucesso('registro atualizado com sucesso!')
        })
        .catch(error => {
          messages.mensagemErro(error.response.data)
        })
  }


  render() {

    const tipos = this.service.obterListaTipos()
    const meses = this.service.obterListaMeses()


    return (
    <div className="col-md-8 row" style={{ position: "relative",  top: "100px" }}> 
      <Card title= 'Cadastro de Lancamentos'>
        <div className="row">
            <div className="col-md-6">
                <FormGroup id="inputDescricao" label="Descricao: *">
                    <input type="text" className="form-control" id="inputDescricao" 
                            name="descricao" 
                            value={this.state.descricao} 
                            onChange={this.handleChange}/>
                </FormGroup>
            </div>
            <div className="col-md-2">
                <FormGroup id="inputValor" label="Valor: *">
                    <input type="text" className="form-control" id="inputValor"
                            name="valor" 
                            value={this.state.valor} 
                            onChange={this.handleChange}/>
                </FormGroup>
            </div>
            <div className="col-md-2">
                <FormGroup id="inputTipo" label="Tipo: *">
                  <SelectMenu id='inputTipo' className='form-control' lista={tipos}
                            name="tipo"
                            value={this.state.tipo} 
                            onChange={this.handleChange}/>
                </FormGroup>
            </div>
                        
        </div>

        <br/>
        <div className="row">
          <div className="col-md-2">
              <FormGroup id="inputAno" label="Ano: *">
                  <input type="text" className="form-control" id="inputDescricao"
                            name="ano"
                            value={this.state.ano} 
                            onChange={this.handleChange}/>
              </FormGroup>
          </div>

          <div className="col-md-4">
              <FormGroup id="inputMes" label="Mes: *">
                <SelectMenu id='inputMes' className='form-control' lista={meses}
                            name="mes"
                            value={this.state.mes} 
                            onChange={this.handleChange}/>
              </FormGroup>
          </div>

          <div className="col-md-2">
              <FormGroup id="inputStatus" label="Status:">
                   <input type="text" className="form-control" id="inputStatus"
                            name="status"
                            value={this.state.status} disabled />
              </FormGroup>
          </div>
                    
        </div>
        <br/>
        <button onClick={this.submit} type="button" className="btn btn-success btn-space medium-btn">Salvar</button>
        <button onClick={this.atualizar} type="button" className="btn btn-success btn-space medium-btn">Atualizar</button>
        <button onClick={e => this.props.history.push('/consulta-lancamentos')} type="button" className="btn btn-secondary medium-btn">Cancelar</button>
      </Card>
    </div>
    );
  }
}

export default withRouter(CadastroLancamentos);
