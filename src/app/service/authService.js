import LocalStorageService from "./localStorage";

export const USUARIO_LOGADO = '_usuario_logado'

export default class AuthService{

    static isUsuarioAutenticado(){
        const usuario = LocalStorageService.obterItem(USUARIO_LOGADO)
        return usuario && usuario.id
    }


    static removerUsuarioAutenticado(){
        localStorage.removeItem(USUARIO_LOGADO)
    }


    static logar(usuario){
        LocalStorageService.adicionarItem(USUARIO_LOGADO, usuario)
    }

    static obterUsuarioAutenticado(){
        return LocalStorageService.obterItem(USUARIO_LOGADO)
    }


}