import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';
import { AppModule } from '../app.module';
import { ComponentsModule } from '../components/components.module';

@Injectable({
  providedIn: 'root'
})

export class InfoService {
  private API_URL = ComponentsModule.getUrl() + 'Services/';
  constructor(
    public http: HttpClient,
    // tslint:disable-next-line: variable-name
    private _platform: Platform  ) {
    // este comando evita erros de cabeçalhos
    if (this._platform.is('cordova')) {
      this.API_URL = ComponentsModule.getUrl() + 'Services/';
    }
  }
  /* public getInfo() {
     return this.http.get(`${this.API_URL}getInfo`);
     //return this.http.get(`${this.API_URL}getInfo`, {responseType: 'text'});
  } */
  public getInformacao(id): Observable<any> {
    // 1- Cartilha, 2- Sobre e 3- Termos
    return this.http
      .get<any>(`${this.API_URL}getInfo/?id=${id}`)
      .pipe(
        map( res => {
          return res;
        })
      );
  }
}

