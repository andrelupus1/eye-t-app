import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { InfoService } from './../../service/info.service';
import { Component, OnInit } from '@angular/core';
import { Info } from 'src/app/interface/info';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cartilha',
  templateUrl: './cartilha.page.html',
  styleUrls: ['./cartilha.page.scss']
})
export class CartilhaPage implements OnInit {
  cartilha: string;
  logo = 'assets/img/logo-trans.png';
  constructor(
    private infoService: InfoService,
    private router: Router,
    private storage: Storage,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.getInfo();
  }
  // SAIR
  getLogout() {
    this.storage.clear();
   //  console.log('Limpando storage');
    this.presentToast('Obrigado por usar nosso APP!');
    this.router.navigate(['/login']);
   //  console.log('sair');
  }

  async getInfo(id = '1') {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });
    await loading.present();
    await this.infoService.getInformacao(id)
      .subscribe((res: Info[]) => {
        //  console.log(res);
        this.cartilha = `${res}`;
        if (this.cartilha) {
          loading.dismiss();
        } else {
          loading.dismiss();
        }
      });
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
