import { InfoService } from './../../service/info.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Info } from 'src/app/interface/info';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
})
export class SobrePage implements OnInit {
  sobre: any;
  logo = 'assets/img/logo-trans.png';
  constructor(
    private loadingController: LoadingController,
    private infoService: InfoService
  ) { }

  ngOnInit() {
    this.getInfo();
   /*  this.info.getInfo()
    .then(res => {
      this.texto = res[1];
    }); */
  }
  async getInfo(id= '2') {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });
    await loading.present();
    await this.infoService.getInformacao(id)
      .subscribe((res: Info[]) => {
        //  console.log(res);
        this.sobre = res;
        if (this.sobre) {
          loading.dismiss();
        } else {
          loading.dismiss();
        }
      });
    /* .then(res => {
      this.sobre = res;
     //  console.log(this.sobre);
      loading.dismiss();
    }, err => {
     //  console.log(err);
      loading.dismiss();
    }); */
  }

}
