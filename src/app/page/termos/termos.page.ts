import { Component, OnInit } from '@angular/core';
import { Info } from 'src/app/interface/info';
import { InfoService } from 'src/app/service/info.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-termos',
  templateUrl: './termos.page.html',
  styleUrls: ['./termos.page.scss'],
})
export class TermosPage implements OnInit {
  termos: any;
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
  async getInfo(id= '3') {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });
    await loading.present();
    await this.infoService.getInformacao(id)
      .subscribe((res: Info[]) => {
        //  console.log(res);
        this.termos = res;
        if (this.termos) {
          loading.dismiss();
        } else {
          loading.dismiss();
        }
      });
    /* .then(res => {
      this.termos = res;
      //  console.log(this.termos);
      loading.dismiss();
    }, err => {
     //  console.log(err);
      loading.dismiss();
    }); */
  }

}
