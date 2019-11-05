import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
// import { PopoverComponent } from './popover/popover.component';

@NgModule({
    declarations: [HeaderComponent],
    imports: [
        IonicModule
    ],
    exports: [HeaderComponent]

})
export class ComponentsModule {
    // private static url = 'http://localhost/web/eye-t.net/api/';
    private static url = 'https://eye-t.net.br/api/';

    static getUrl() {
        return this.url;
    }
}
