import React from "react";
import currenciesFormater from 'currency-formatter'

// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.lancamentos.map(lancamento => {

        const MESES = [ 'JAN', 'FEV', 'MAR', 'ABRI', 'MAI', 'JUN', 'JUL', 'AGO', 'SET','OUT', 'NOV', 'DEZ']

        return (
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>{currenciesFormater.format(lancamento.valor, {locale: 'pt-BR'})}</td>
                <td>{lancamento.tipo}</td>
                <td>{MESES[lancamento.mes -1]}</td>
                <td>{lancamento.status}</td>
                <td>
                    <button onClick={e => props.editarAction(lancamento.id)} type="button" className="btn btn-primary btn-space medium-btn">Editar</button>
                    <button onClick={e => props.deleteAction(lancamento)} type="button" className="btn btn-danger medium-btn">Deletar</button>
                </td>
            </tr>
        )
    })


    return(
        <table className='table table-hover'>
            <thead>
                   <tr>
                      <th scope="col">Descrição</th>
                      <th scope="col">Valor</th>
                      <th scope="col">Tipo</th>
                      <th scope="col">Mês</th>
                      <th scope="col">Situação</th>
                      <th scope="col">Ações</th>
                   </tr>
                  </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}