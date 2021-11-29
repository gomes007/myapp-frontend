import React from "react";
import {withRouter} from 'react-router-dom'
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";
import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from '../../app/service/localStorage'
import * as messages from '../../components/toastr'


class ConsultaLancamentos extends React.Component{

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: []
    }

    constructor(){
        super()
        this.service = new LancamentoService();
    }

    buscar = () => {

        if (!this.state.ano) {
            messages.mensagemErro('O prenchimento do campo ano é obrigatorio!')
            return false;
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service.consultar(lancamentoFiltro)
                    .then(response => {
                        this.setState({lancamentos: response.data})
                    }).catch(error => {
                        console.log(error.data)
                    })       
    }

    render(){

        const meses = this.service.obterListaMeses()

        const tipos = this.service.obterListaTipos()

        

        return (
        <div className="col-md-12 row" style={{ position: "relative",  top: "100px" }}>               
            <Card title= 'Consulta Lancamentos'> 
            <div>
                <div className="col-md-1">                       
                    <FormGroup label="Ano *:" htmlFor="inputAno">
                        <input type="text" className="form-control" id="inputAno" value={this.state.ano} onChange={e => this.setState({ano: e.target.value})}/>
                    </FormGroup>
                </div>

                <div className="col-md-3"> 
                    <FormGroup label="Mês:" htmlFor="inputMes">
                        <SelectMenu id='inputMes' className='form-control' lista={meses} value={this.state.mes} onChange={e => this.setState({mes: e.target.value})}/>
                    </FormGroup>

                    <FormGroup label="Descricao:" htmlFor="inputDescricao">
                        <input id='inputDescricao' className='form-control' lista={meses} value={this.state.descricao} onChange={e => this.setState({descricao: e.target.value})}/>
                    </FormGroup>
                                
                    <FormGroup label="Tipo Lançamento:" htmlFor="inputTipo">
                        <SelectMenu id='inputTipo' className='form-control' lista={tipos} value={this.state.tipo} onChange={e => this.setState({tipo: e.target.value})}/>
                    </FormGroup>
                </div>
                      
                <br/>
                <button onClick={this.buscar} type="button" className="btn btn-success btn-space medium-btn">Buscar</button>
                <button type="button" className="btn btn-danger medium-btn">Cadastrar</button>
                </div> 

                <br/>
                <div>
                    <LancamentosTable lancamentos={this.state.lancamentos}/>
                </div>      
            </Card>
        </div>
            )
        }            
}

export default withRouter(ConsultaLancamentos)