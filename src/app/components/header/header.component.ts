import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private storage: Storage) { }
  logo = 'assets/img/logo-trans.png';
  ngOnInit() { }
  // SAIR
  getLogout() {
    this.storage.clear();
  }
}
