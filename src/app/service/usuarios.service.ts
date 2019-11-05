import { ComponentsModule } from './../components/components.module';
import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http/';

@Injectable()

export class UsuariosService {
  private API_URL = ComponentsModule.getUrl() + 'Usuarios/';

  constructor(
    public http: HttpClient,
    // tslint:disable-next-line: variable-name
    private _platform: Platform,
    private configService: ConfigService
  ) {
    // verifica em qual plataforma esta sendo aberto o app para redirecionamento de url de acesso
    // este comando evita erros de cabeçalhos
    if (this._platform.is('cordova')) {
      this.API_URL = ComponentsModule.getUrl() + 'Usuarios/';
    }
  }
  // CADASTRAR USUARIO
  addUsuario(values) {
    return new Promise((resolve, reject) => {
      this.http.post(this.API_URL + 'addUsuario', values)
        .subscribe((result: any) => {
          resolve(result);
        },
          (error) => {
            reject(error.error);
          });
    });
  }
  // ATUALIZA USUÁRIO - PERFIL
  upUsuario(values) {
   //  console.log(values);

    return new Promise((resolve, reject) => {
      // tslint:disable-next-line: prefer-const
      let data = {
        id: values['id'],
        nick: values['nick'],
        nome: values['nome'],
        email: values['email'],
        crm: values['crm'],
        senha: values['senha']
      };
      //  console.log("dados de cadastro: ");
      //  console.log(data);
      this.http.post(this.API_URL + 'upUsuario', data)
        .subscribe((result: any) => {
          let dados = result.dados;
          //  console.log(dados);
          resolve(dados);
          if (dados.loginUsuario === true || dados.status === 1) {
            // Grava Local Storage
            this.configService.setConfig(dados);
           //  console.log('Gravado no Storage!');
          }
        },
          (error) => {
            reject(error.error);
          });
    });
  }

  // RECUPERA SENHA
  getRecupera(email: string) {
    //  console.log(values);
    return new Promise((resolve, reject) => {
      const data = {
        email
      };
      //  console.log(data);
      this.http.post(this.API_URL + 'recuperaSenha', data)
        .subscribe((result: any) => {
          //result.dados
          return resolve(result.dados);
        },
          (error) => {
            return reject(error.error);
          });

    });
  }
}
