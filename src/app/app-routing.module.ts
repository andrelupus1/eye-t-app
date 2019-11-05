import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard],
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  /* { path: '', canActivate: [AuthGuard], loadChildren: './tabs/tabs.module#TabsPageModule' }, */
  { path: 'cadastrar', loadChildren: './page/cadastrar/cadastrar.module#CadastrarPageModule' },
  { path: 'login', loadChildren: './page/login/login.module#LoginPageModule' },
  { path: 'recuperar', loadChildren: './page/recuperar/recuperar.module#RecuperarPageModule' },
  { path: 'termos', loadChildren: './page/termos/termos.module#TermosPageModule' },
  { path: 'sobre', canActivate: [AuthGuard], loadChildren: './page/sobre/sobre.module#SobrePageModule' },
  { path: 'perfil', canActivate: [AuthGuard], loadChildren: './page/perfil/perfil.module#PerfilPageModule' },
  { path: 'cartilha', canActivate: [AuthGuard], loadChildren: './page/cartilha/cartilha.module#CartilhaPageModule' },
  { path: 'notificar', canActivate: [AuthGuard], loadChildren: './page/notificar/notificar.module#NotificarPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
