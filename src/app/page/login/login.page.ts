import { AuthService, UserList } from './../../service/auth.service';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  logo = '../../assets/img/logo.png';
  constructor(
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    private statusBar: StatusBar,
    private router: Router,
    private storage: Storage,
    private auth: AuthService
  ) {
    // let status bar overlay webview
    this.statusBar.overlaysWebView(false);
    // set status bar to white
    this.statusBar.backgroundColorByHexString('#09a266');
  }
  // tslint:disable-next-line: variable-name
  validations_form: FormGroup;
  users: UserList[]; // Lista de Usuários
  // tslint:disable-next-line: variable-name
  validation_messages = {
    email: [
      { type: 'required', message: 'E-mail é obrigatório.' },
      { type: 'pattern', message: 'Por favor, insira um e-mail válido!' },
      { type: 'validEmail', message: 'Este e-mail já foi cadastrado.' }
    ],
    senha: [
      { type: 'required', message: 'Senha é obrigatório.' },
      { type: 'minlength', message: 'A senha que tem ter mais de 5 caracteres.' }
    ]
  };

  ngOnInit() {
    // Validação Formulário
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      // sexo: new FormControl(this.genders[0], Validators.required),
      // country_phone: this.country_phone_group,
      senha: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
    });
  }
 /*  onSubmit() {
    //  console.log(this.validations_form.value);
    // this.router.navigate(["/login"]);

  } */
  // Logar
  getLogin() {
    // this.auth.setLoggedIn(true)
    const data = this.validations_form.value;
    this.auth.setLoggedIn(data.email, data.senha)
      .then((result: any) => {
        //  console.log(result);
        if (result.status == 1 || result.loginUsuario == true) {
          this.presentToast('Seja bem-vindo ao EYE-T!');
          this.router.navigate(['/tabs/notif'], { replaceUrl: true });
          // window.location.reload();
        } else {
          this.router.navigate(['/login']);
          // tslint:disable-next-line: max-line-length
          this.presentToast('Erro na autenticação! Verrifique: <br>- Se o e-mail está cadastrado. <br>- A conta foi ativada (através do link de ativação que foi enviado por e-mail)?');
        }

      }).catch(error => {
        console.log(error);
      });
  }
 /*  getRecuperar() {
    this.router.navigate(['/recupera']);
    this.presentToast('A nova senha será enviada por e-mail!');
  }
  getCadastrar() {
    this.router.navigate(['/cadastrar']);
    this.presentToast('Após cadastro, será enviado um e-mail de ativação!');
  } */
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 10000,
      buttons: ['OK']
    });
    await toast.present();
  }
  // SAIR
  getLogout() {
    this.storage.clear();
    //  console.log('Limpando storage');
    //  console.log('sair');
    this.presentToast('Obrigado por usar nosso APP!');
    // tslint:disable-next-line: no-unused-expression
    this.router.navigate['/login'];
  }
  getStorage() {
    //  console.log(this.auth.isAuthenticated());
    this.auth.getUserAll()
      .then((result) => {
        this.users = result;
        //  console.log(result);
      });
  }
}