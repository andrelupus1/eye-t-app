import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

// tslint:disable-next-line: variable-name
const config_key_name = 'config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(public http: HttpClient, private storage: Storage) {
  }

  // recupera os dados do local storage
  getConfig(): any {
    return this.storage.get(config_key_name);
  }

  // grava os dados no local storage
  setConfig(dados: any): any {
    this.storage.set(config_key_name, dados);
  }
}
