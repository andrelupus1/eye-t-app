import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ConfigService } from './config.service';
import { Hospital } from '../interface/hospital';
import { Observable } from 'rxjs';
import { AppModule } from '../app.module';
import { ComponentsModule } from '../components/components.module';

@Injectable({
  providedIn: 'root'
})
export class ColetaService {
  private API_URL = ComponentsModule.getUrl() + 'Services/';
  constructor(
    public http: HttpClient,
    // tslint:disable-next-line: variable-name
    private _platform: Platform,
    private configService: ConfigService
  ) {
    // este comando evita erros de cabeçalhos
    if (this._platform.is('cordova')) {
      this.API_URL = ComponentsModule.getUrl() + 'Services/';
    }
  }

  // ADD COLETA
  addColeta(values: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.API_URL + 'addcoleta', values)
        .subscribe((result: any) => {
          resolve(result);
        },
          (error) => {
            reject(error.error);
          });
    });
  }

  // GET HOSPITAL
  public getHospital(): Observable<Hospital[]> {
      return this.http.get<Hospital[]>(this.API_URL + 'getHospital');
    }
}
