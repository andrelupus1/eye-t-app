import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  constructor(
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    private usuariosService: UsuariosService,
    private router: Router
  ) { }
  // tslint:disable-next-line: variable-name
  validations_form: FormGroup;

  validation_messages = {
    email: [
      { type: 'required', message: 'E-mail é obrigatório.' },
      // { type: 'pattern', message: 'Por favor, insira um e-mail válido!' },
      { type: 'email', message: 'Por favor, insira um e-mail válido!' }
    ]
  };

  ngOnInit() {
    // Validação Formulário
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
        // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

  recuperaSenha() {
    const email = this.validations_form.get('email').value;
    //  console.log(email);
    this.usuariosService.getRecupera(email)
      .then((result: any) => {
        const retorno = result['status_cadastro'];
        //  console.log(result);
        //  console.log('Retorno: ' + retorno);
        if (retorno === '1') {
          this.presentToast('Uma nova senha foi enviada para seu e-mail!');
        } else {
          this.presentToast('Erro: Verifique se o e-mail existe ou foi cadastrado!');
        }
        this.router.navigate(['/login']);
      }).catch((error: any) => {
       //  console.log(error);
        this.presentToast('Erro ao recuperar senha!');
        this.router.navigate(['/login']);

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
