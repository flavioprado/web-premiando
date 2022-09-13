import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { IndexComponent } from './index.component';
import { SafeHtmlPipe } from 'app/pipes/safe-html-utils';
import { ConfirmarReservaComponent } from '../sorteios/sorteio-ativo/confirmar-reserva/confirmar-reserva.component';
import { PrincipalComponent } from '../principal/principal.component';
import { GanhadoresComponent } from '../ganhadores/ganhadores.component';
import { SorteiosComponent } from '../sorteios/sorteios.component';
import { SorteioAtivoComponent } from '../sorteios/sorteio-ativo/sorteio-ativo.component';
import { ViewMinhasComprasComponent } from '../minhas-compras/view-minhas-compras/view-minhas-compras.component';
import { TermosComponent } from '../termos/termos.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { AppRoutingModule } from 'app/app.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMaskModule } from 'ngx-mask';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ViewVideoComponent } from '../principal/view-video/view-video.component';
import { MeusNumerosComponent } from '../sorteios/sorteio-ativo/meus-numeros/meus-numeros.component';
import { AuthGuardService } from 'app/guards/auth-guard.service';
import { JwtInterceptor } from 'app/guards/jwt-interceptor';
import { HttpErrorInterceptor } from 'app/guards/http-error-interceptor';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const routes = [
    { path: '', component: IndexComponent }
];


@NgModule({
  declarations: [
    IndexComponent,
    GanhadoresComponent,
    SorteiosComponent,
    SorteioAtivoComponent,
    ViewMinhasComprasComponent,
    TermosComponent,
    CheckoutComponent,
    ConfirmarReservaComponent,
    ViewVideoComponent,
    MeusNumerosComponent,
    SafeHtmlPipe,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule, 
    RouterModule.forChild(routes),
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
    { provide: AuthGuardService },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
})
export class IndexModule { }
