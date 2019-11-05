import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { ConfigService } from './service/config.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public logado;
  constructor(
    private loadingController: LoadingController,
    private storage: Storage,
    private configService: ConfigService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    this.islogg();
  }
  public appPages = [
    {
      title: 'Início',
      url: '/tabs/notif',
      icon: 'home'
    },
    {
      title: 'Sobre',
      url: '/tabs/sobre',
      icon: 'information-circle-outline'
    },
    /* {
      title: 'Termos',
      url: '/termos',
      icon: 'exit'
    } */
  ];
  public logo = 'assets/img/logo-trans.png';

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // SAIR
  getLogout() {
    this.storage.clear();
    this.islogg();
    //  console.log('Limpando storage');
    //  console.log('sair');
  }
  async islogg() {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });
    await loading.present();
    // ESCODE SIDEBAR NA ENTRADA
    await this.configService.getConfig()
      .then(res => {
        if (res != null) {
          this.logado = true;
        } else {
          this.logado = false;
          this.islogg();
        }
        // loading.dismiss();
      });
      // console.log(this.logado);
  }
}
