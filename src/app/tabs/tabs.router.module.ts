import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'cart',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../page/cartilha/cartilha.module').then(m => m.CartilhaPageModule)
              // import('../tab1/tab1.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'notif',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../page/notificar/notificar.module').then(m => m.NotificarPageModule)
          }
        ]
      },
      {
        path: 'sobre',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../page/sobre/sobre.module').then(m => m.SobrePageModule)
          }
        ]
      },
      {
        path: 'perfil',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../page/perfil/perfil.module').then(m => m.PerfilPageModule)
          }
        ]
      },
     /*  {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab3/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      }, */
      {
        path: '',
        redirectTo: '/tabs/notif',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/notif',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
