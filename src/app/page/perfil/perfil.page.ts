import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { UsuariosService } from './../../service/usuarios.service';
import { AuthService, UserList } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  users: UserList[]; // Lista dos dados do Usuário
  key: string;

  constructor(
    public formBuilder: FormBuilder,
    private auth: AuthService,
    private usuariosService: UsuariosService,
    private toastController: ToastController,
    private configService: ConfigService,
    private storage: Storage,
    private router: Router,
    private loadingController: LoadingController
  ) {
    this.usersSubject = new BehaviorSubject<any>(this.users);
    this.isusers = this.usersSubject.asObservable();
    // const currentDate = new Date().toISOString().substring(0, 10);
  }

  // tslint:disable-next-line: variable-name
  validations_form: FormGroup;
  // tslint:disable-next-line: variable-name
  matching_passwords_group: FormGroup;
  private usersSubject: BehaviorSubject<any>;
  public isusers: Observable<any>;
  // Mensagens de Erros
  // tslint:disable-next-line: variable-name
  validation_messages = {
    id: [
      { type: 'required', message: 'ID é obrigatório.' }
    ],
    nome: [
      { type: 'required', message: 'Nome é obrigatório.' }
    ],
    nick: [
      { type: 'required', message: 'Nick é obrigatório.' }
    ],
    crm: [
      { type: 'required', message: 'CRM é obrigatório.' }
    ],
    email: [
      { type: 'required', message: 'E-mail é obrigatório.' },
      { type: 'pattern', message: 'Por favor, insira um e-mail válido!' },
      { type: 'upValidEmail', message: 'Este e-mail já está cadastrado.' }
    ],
    senha: [
      { type: 'required', message: 'Senha é obrigatório.' },
      { type: 'minlength', message: 'A senha que tem ter mais de 5 caracteres.' },
      { type: 'pattern', message: 'Sua senha deve conter pelo menos uma maiúscula, uma minúscula e um número.' }
    ]
  };

  ngOnInit() {
    // Valida formulário
    this.getUser();
  }
  ngAfterViewInit() {
    this.perfilForm();
  }

  async getUser() {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });
    await loading.present();
    await this.auth.getUser()
      .then((result) => {
        this.usersSubject.next(result);
        //  console.log(this.usersSubject.value)
        this.users = result;
        console.log(this.users);
        if (this.users[0]['user'] != null) {
          this.validations_form.setValue({
            id: this.users[0]['user']['id'],
            nome: this.users[0]['user']['nome'],
            nick: this.users[0]['user']['nick'],
            crm: this.users[0]['user']['crm'],
            email: this.users[0]['user']['email'],
            senha: ''
          });
          loading.dismiss();
        } else {
          this.presentToast('Ops! Alguma coisa deu errado, puxe para baixo para atualizar as informações!');
          loading.dismiss();
        }
      }, err => {
        //  console.log(err);
        loading.dismiss();
      });
  }

  perfilForm() {
    this.validations_form = this.formBuilder.group({
      id: new FormControl('', Validators.nullValidator),
      nome: new FormControl('', Validators.nullValidator),
      nick: new FormControl('', Validators.nullValidator),
      email: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      senha: new FormControl('', Validators.nullValidator),
      crm: new FormControl('', Validators.nullValidator)
    }); // , {updateOn: 'submit'});

  }

  onSubmit() {
    // this.auth.setLoggedIn(true)
    const data = this.validations_form.value;
    //  console.log(data);
    this.usuariosService.upUsuario(data)
      .then((result: any) => {
        //  console.log(result);
        // tslint:disable-next-line: triple-equals
        if (result.status_cadastro === '1') {
          data.loginUsuario = true;
          data.status = '1';
          //  console.log(data);
          this.configService.setConfig(data);
          this.router.navigate(['/']);
          this.presentToast('Atualizado com sucesso!');
        } else {
          this.router.navigate(['/perfil']);
          this.presentToast('Ops! Erro ao atualizar!');
        }
      });
  }
  // SAIR
  getLogout() {
    this.storage.clear();
    //  console.log('Limpando storage');
    this.presentToast('Obrigado por usar nosso APP!');
    this.router.navigate(['/login']);
    //  console.log('sair');
  }
  // REFRESH
  doRefresh(event) {
    // console.log('Begin async operation');
    setTimeout(() => {
      // console.log('Async operation has ended');
      event.target.complete();
      window.location.reload();
    }, 2000);
  }
  // MENSAGEM
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 6000,
      buttons: ['OK']
    });
    await toast.present();
  }
}
