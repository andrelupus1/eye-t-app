import { AppComponent } from './../../app.component';
import { PopoverComponent } from './../../components/popover/popover.component';
import { Storage } from '@ionic/storage';
import { ToastController, PopoverController, LoadingController } from '@ionic/angular';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/service/config.service';
import { ColetaService } from 'src/app/service/coleta.service';
import { User } from 'src/app/interface/user';
import { Hospital } from 'src/app/interface/hospital';

@Component({
  selector: 'app-notificar',
  templateUrl: './notificar.page.html',
  styleUrls: ['./notificar.page.scss'],
})
export class NotificarPage implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private configService: ConfigService,
    private coleta: ColetaService,
    private storage: Storage,
    private toastController: ToastController,
    private popoverController: PopoverController,
    private router: Router
  ) {
  }
  // tslint:disable-next-line: variable-name
  validations_form: FormGroup;
  hospitais: Hospital[] = []; // Impotante iniciar
  checkbox: Array<any>;
  checked: false;
  // formattedMessage: string;
  users: User;
  // logo = 'assets/img/logo-trans.png';
  // MENSAGEM
  // tslint:disable-next-line: variable-name
  validation_messages = {
    doador: [
      { type: 'required', message: 'Sigla do doador é obrigatório.' },
      { type: 'pattern', message: 'Apenas a Sigla do Doador! Apenas letras.' }
    ],
    idade: [
      { type: 'required', message: 'Idade é obrigatório.' },
      { type: 'min', message: 'Idade mínima permitida: 0 anos.' },
      { type: 'max', message: 'Idade máxima permitida: 130 anos.' },
      { type: 'pattern', message: 'Apenas números!' }
    ],
    hospital: [
      { type: 'required', message: 'Hospital é obrigatório.' }
    ],
    registro: [
      { type: 'required', message: 'Registro é obrigatório.' }
    ],
    obito: [
      { type: 'required', message: 'Óbito é obrigatório.' }
    ]
  };
  ngOnInit() {
    this.form();
  }

  // ngAfterViewInit() {
  // }
  form() {
    // Storage User
    this.configService.getConfig()
      .then(res => {
        //  console.log(res);
        // tslint:disable-next-line: no-string-literal
        this.users = res;
        // Forçar, pois pela frontend não está indo
        this.validations_form.controls.idusuarios.setValue(this.users['id']);
        this.validations_form.controls.email.setValue(this.users['email']);
      });

    // Hospitais
    this.coleta.getHospital().subscribe(res => {
      //  console.log(res);
      // tslint:disable-next-line: no-string-literal
      this.hospitais = res['dados'];
      //  console.log(this.hospitais);
    });

    this.checkbox = [
      { nome: 'criterio1', val: 'Idade menor que 2 anos ou igual ou maior que 80 anos', isChecked: this.checked },
      { nome: 'criterio2', val: 'Período de óbito acima de 06 Horas ou acima de 12 Horas REFRIGERADO', isChecked: this.checked },
      { nome: 'criterio3', val: 'Evidência clínica ou exame laboratorial positivo para: HIV, HEP. B, HEP. C, HTLV I e II', isChecked: this.checked },
      { nome: 'criterio4', val: 'Portador de septicemia ou endocardite bacteriana', isChecked: this.checked },
      { nome: 'criterio5', val: 'Morte de causa desconhecida ou doença de etiologia desconhecida', isChecked: this.checked },
      { nome: 'criterio6', val: 'Portador de neoplasias hematológicas (linfoma, leucemia ou mieloma múltiplo)', isChecked: this.checked },
      { nome: 'criterio7', val: 'Portador de câncer nos olhos', isChecked: this.checked },
      { nome: 'criterio8', val: 'Uso de drogas ilícitas ou evidências do uso', isChecked: this.checked }
    ];

    this.validations_form = this.formBuilder.group({
      idusuarios: new FormControl('', Validators.nullValidator),
      email: new FormControl('', Validators.nullValidator),
      observacao: new FormControl('', Validators.nullValidator),
      doador: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*')]
      }),
      // nome: new FormControl('', Validators.required),
      idhospital: new FormControl('', Validators.required),
      idade: new FormControl('', {
        validators: [
          Validators.required,
          Validators.min(0),
          Validators.max(130)]
      }),
      registro: new FormControl('', Validators.required),
      obito: new FormControl(this.myDate(1), Validators.required),
      dataregistro: new FormControl(this.myDate(1), Validators.required),
      criterio1: new FormControl('', Validators.nullValidator),
      criterio2: new FormControl('', Validators.nullValidator),
      criterio3: new FormControl('', Validators.nullValidator),
      criterio4: new FormControl('', Validators.nullValidator),
      criterio5: new FormControl('', Validators.nullValidator),
      criterio6: new FormControl('', Validators.nullValidator),
      criterio7: new FormControl('', Validators.nullValidator),
      criterio8: new FormControl('', Validators.nullValidator)
    });
    // this.onChanges();
  }
  // NOTIFICAR
  onSubmit(values: any) {
    // debugger;
    //  console.log(values);
    this.coleta.addColeta(values)
      .then((result: any) => {
        //  console.log(result);
        if (result.dados['status_cadastro'] === '1') {
          this.presentToast('Notificado com sucesso!');
          this.validations_form.reset();
          // this.router.navigate(['/tabs/notif']);
        } else {
          this.presentToast('Erro ao notificar, tente novamente!');
          // this.router.navigate(['/']);
        }
      }).catch((error: any) => {
        //  console.log(error);
        this.presentToast('Erro ao notificar, tente novamente! Causa: <br>' + error);
        // this.router.navigate(['/']);
      })
      .finally(() => {
        //  console.log('finalizado');
        this.presentPopover('show');
        this.router.navigate(['/tabs/notif']);
      }
      );
  }
  // MARCAR CHECKOUT
  onBlur() {
    const idade = this.validations_form.get('idade').value;
    const obito = this.validations_form.get('obito').value;
    //  console.log(this.validations_form.get('idade').value);
    if (idade <= 2 || idade >= 80) {
      this.validations_form.controls.criterio1.setValue(true);
    } else {
      this.validations_form.controls.criterio1.setValue(false);
    }
    if (obito) {
      const horaAtual = this.myDate(2);
      const dataH = obito.slice(11, 13); // 2019-08-22T00:40:00-03:00
      //  console.log("Hora Atual: "+horaAtual);
      //  console.log("Hora do Óbito: "+obito);
      //  console.log("Hora :"+dataH);
      if (dataH > horaAtual) {
        this.presentToast('A hora do óbito não pode ser maior que a hora do registro!');
      } else {
        // Se maior que 12 horas marca checkbox
        if ((horaAtual - dataH) >= 12) {
          this.validations_form.controls.criterio2.setValue(true);
          //  console.log("É maior que 12 horas!");
        } else {
          this.validations_form.controls.criterio2.setValue(false);
        }
      }
    }
  }
  // DATA E HORA
  myDate(v) {
    let dt = new Date(),
      current_date: any = dt.getDate(),
      current_month: any = dt.getMonth() + 1,
      current_year: any = dt.getFullYear(),
      current_hrs: any = dt.getHours(),
      current_mins: any = dt.getMinutes(),
      current_secs: any = dt.getSeconds(),
      current_datetime: any;

    // Add 0 before date, month, hrs, mins or secs if they are less than 0
    current_date = current_date < 10 ? '0' + current_date : current_date;
    current_month = current_month < 10 ? '0' + current_month : current_month;
    current_hrs = current_hrs < 10 ? '0' + current_hrs : current_hrs;
    current_mins = current_mins < 10 ? '0' + current_mins : current_mins;
    current_secs = current_secs < 10 ? '0' + current_secs : current_secs;


    if (v === 1) {  // 2016-07-16T19:20:30
      // tslint:disable-next-line: max-line-length
      current_datetime = current_year + '-' + current_month + '-' + current_date + 'T' + current_hrs + ':' + current_mins; // + ':' + current_secs;
      return current_datetime;
    }
    if (v === 2) { // Hora
      current_datetime = current_hrs; // + ':' + current_secs;
      return current_datetime;
    }
  }
  // SAIR
  getLogout() {
    this.storage.clear();
    //  console.log('Limpando storage');
    this.presentToast('Obrigado por usar nosso APP!');
    this.router.navigate(['/login']);
    //  console.log('sair');
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
  // POPOVER
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
