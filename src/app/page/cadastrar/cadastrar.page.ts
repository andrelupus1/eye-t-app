import { EmailValidator } from './../../validators/email.validator';
import { AuthService } from './../../service/auth.service';
import { UsuariosService } from './../../service/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { PasswordValidator } from '../../validators/password.validator';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  constructor(
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    public usuariosService: UsuariosService,
    private auth: AuthService,
    private router: Router
  ) {
    // tslint:disable-next-line: no-unused-expression
    this.usuariosService;
  }
  // tslint:disable-next-line: variable-name
  validations_form: FormGroup;
  // tslint:disable-next-line: variable-name
  matching_passwords_group: FormGroup;
  // tslint:disable-next-line: variable-name
  verify_email_group: FormGroup;
  // tslint:disable-next-line: variable-name
  validation_messages = {
    nome: [
      { type: 'required', message: 'Nome é obrigatório.' }
    ],
    nick: [
      { type: 'required', message: 'Apelido é obrigatório.' }
    ],
    crm: [
      { type: 'required', message: 'Apelido é obrigatório.' }
    ],
    email: [
      { type: 'required', message: 'E-mail é obrigatório.' },
      { type: 'pattern', message: 'Por favor, insira um e-mail válido!' },
      { type: 'email', message: 'Verifique se o email está correto!' }
      //  { type: 'validemail', message: 'Este e-mail já foi cadastrado.' }
    ],
    senha: [
      { type: 'required', message: 'Senha é obrigatório.' },
      { type: 'minlength', message: 'A senha que tem ter mais de 5 caracteres.' },
      { type: 'pattern', message: 'Sua senha deve conter pelo menos uma maiúscula, uma minúscula e um número.' }
    ],
    confirma_senha: [
      { type: 'required', message: 'Precisa confirmar a senha.' }
    ],
    verify_email: [
      { type: 'validemail', message: 'Este e-mail já foi cadastrado.' }
    ],
    matching_passwords: [
      { type: 'areEqual', message: 'As senhas não coincidem!' }
    ],
    termos: [
      { type: 'pattern', message: 'Você deve aceitar os termos e condições.' }
    ],
  };
  ngOnInit() {
    this.form();
  }
  form() {
    // Email
    this.verify_email_group = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        Validators.email,
      ])),
    }, (formGroup: FormGroup) => {
      const result = EmailValidator.verify_email(this.auth, formGroup).then(res => {
        if (res) { // Se 1 valida
          // contornar o bug da atualização automática
          this.validations_form.controls['verify_email'].setErrors({ 'validemail': true });
        }
        return res;
      });
      // sempre result vem
      return null;
    });
    // Password
    this.matching_passwords_group = new FormGroup({
      senha: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirma_senha: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.validations_form = this.formBuilder.group({
      nome: new FormControl('', Validators.required),
      nick: new FormControl('', Validators.required),
      // Validators.email//this.emailValidator,
      crm: new FormControl('', Validators.required),
      matching_passwords: this.matching_passwords_group,
      verify_email: this.verify_email_group,
      termos: new FormControl(true, Validators.pattern('true')),
    });
  }

  // MARCAR CHECKOUT - DESATIVADO (funcionou)
  // onBlur() {
  //   const email = this.validations_form.get('email').value;
  //   this.validations_form.valueChanges.subscribe(() => {
  //     this.validations_form.updateValueAndValidity();
  //   });
  //   if (email != null) {
  //     this.validations_form.controls.email.hasError('validEmail');
  //   } else {
  //     // tslint:disable-next-line: no-unused-expression
  //     this.validations_form.controls.email.valid;
  //   }
  // }
  onSubmit() {
    //  console.log('Dados Enviados: '+JSON.stringify(this.validations_form.value));
    this.usuariosService.addUsuario(this.validations_form.value)
      .then((result: any) => {
       //  console.log(result);
        if (result['dados']['status_cadastro'] === "1") {
          this.presentToast('Cadastro realizado com sucesso!<br>Verifique o seu e-mail para ativar sua conta.');
          this.router.navigate(['login']);
        } else {
          this.presentToast('Erro ao realizar cadastro, tente novamente!');
          this.router.navigate(['cadastrar']);
          // this.router.navigate(['login'])
        }
      }).catch((error: any) => {
       //  console.log(error);
        this.presentToast('Erro ao realizar cadastro, tente novamente!');
        this.router.navigate(['cadastrar']);
      });
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 6000,
      buttons: ['OK']
    });
    await toast.present();
  }
}