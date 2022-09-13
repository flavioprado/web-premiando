import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { IndexComponent } from './site-premiando/index/index.component';
import { PrincipalComponent } from './site-premiando/principal/principal.component';
import { GanhadoresComponent } from './site-premiando/ganhadores/ganhadores.component';
import { SorteiosComponent } from './site-premiando/sorteios/sorteios.component';
import { SorteioAtivoComponent } from './site-premiando/sorteios/sorteio-ativo/sorteio-ativo.component';
import { ViewMinhasComprasComponent } from './site-premiando/minhas-compras/view-minhas-compras/view-minhas-compras.component';
import { TermosComponent } from './site-premiando/termos/termos.component';
import { CheckoutComponent } from './site-premiando/checkout/checkout.component';

const routes: Routes =[
  { path: '',redirectTo: 'principal',pathMatch: 'full' }, 
  { path: 'login-admin', component: LoginAdminComponent },
  {
    path: '',
    component: IndexComponent,
    children: [
      { path: 'principal',component: PrincipalComponent },
      { path: 'ganhadores', component: GanhadoresComponent },
      { path: 'sorteios', component: SorteiosComponent },
      { path: 'sorteioAtivo/:sorteio/:id', component: SorteioAtivoComponent },
      { path: 'minhas-compras', component: ViewMinhasComprasComponent },
      { path: 'termos', component: TermosComponent },
      { path: 'checkout', component: CheckoutComponent },
    ],
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuardService],
    children: [{
      path: 'admin',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
