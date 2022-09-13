import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AuthGuardService } from './guards/auth-guard.service';
import { JwtInterceptor } from './guards/jwt-interceptor';
import { HttpErrorInterceptor } from './guards/http-error-interceptor';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import {MatNativeDateModule} from '@angular/material/core';
import { ComprasModule } from './compras/compras.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { GanhadoresModule } from './ganhadores/ganhadores.module';
import { BannerModule } from './banner/banner.module';
import { MsgWhattsComponent } from './msg-whatts/msg-whatts.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule, 
    CurrencyMaskModule,
    HttpClientModule,
    ComponentsModule,
    ComprasModule,
    GanhadoresModule,
    BannerModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    NgxPaginationModule,
    OrderModule,
    MatNativeDateModule,
    RouterModule,
    CommonModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
  declarations: [		
    AppComponent,
    AdminLayoutComponent,
      MsgWhattsComponent,
   ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
    { provide: AuthGuardService },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
