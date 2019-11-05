export interface User {
    id;
    nome: string;
    nick: string; // sobrenome: string;
    crm: string;
    email: string;
    status: string;
    loginUser: boolean;
}
/*
'nomeUsuario'=> $inputs->nome,
'emailUsuario' => $inputs->email,
'nickName' => $inputs->nick,
'senhaUsuario' => md5($inputs->senha),
'crmUsuario' => $inputs->crm,
'tipoUsuario' => '2',//tipo 2 é usuário
'status' => '0'//cadastra com estatus desativado para ativar via e-mail.
*/
