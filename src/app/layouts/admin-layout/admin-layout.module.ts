import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { ComprasComponent } from 'app/compras/compras.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ClientesComponent } from 'app/clientes/clientes.component';
import { SorteiosComponent } from 'app/sorteios/sorteios.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AuthGuardService } from 'app/guards/auth-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'app/guards/jwt-interceptor';
import { HttpErrorInterceptor } from 'app/guards/http-error-interceptor';
import { GanhadoresComponent } from 'app/ganhadores/ganhadores.component';
import { BannerComponent } from 'app/banner/banner.component';
import { FinanceiroComponent } from 'app/financeiro/financeiro.component';
import { RelatorioFinanceiroComponent } from 'app/relatorio-financeiro/relatorio-financeiro.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatPaginatorModule,
    OrderModule,
    AngularEditorModule, 
    CurrencyMaskModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    ComprasComponent,
    GanhadoresComponent,
    BannerComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    ClientesComponent,
    SorteiosComponent,
    FinanceiroComponent,
    RelatorioFinanceiroComponent
  ],
  schemas:[NO_ERRORS_SCHEMA],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
    { provide: AuthGuardService },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
})

export class AdminLayoutModule {}
