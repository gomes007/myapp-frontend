import ApiService from "../apiservice";
import ErroValidacao from '../exception/ErroValidacao'

class UsuarioService extends ApiService{

    constructor(){
        super('/api/usuarios')
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais)
    }

    obterSaldoPorUsuario(id){
        return this.get(`/${id}/saldo`)
    }

    salvar(usuario){
        return this.post('/', usuario)
    }

    validar(usuario){
        const erros = []

        if (!usuario.nome) {
            erros.push('campo nome e obrigatorio')
        }

        if (!usuario.email) {
            erros.push('campo email e obrigatorio')
        } else if (!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            erros.push('informe email valido')
        }

        if (!usuario.senha || !usuario.senhaRepeticao) {
            erros.push('digite a senha 2x')
        } else if (usuario.senha !== usuario.senhaRepeticao) {
            erros.push('as senhas precisam se iguais nos 2 campos')
        }
            
        if (erros && erros.length > 0) {
            throw new ErroValidacao(erros);
          }
    }

}
export default UsuarioService