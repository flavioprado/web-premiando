import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ComprasComponent } from 'app/compras/compras.component';
import { ClientesComponent } from 'app/clientes/clientes.component';
import { SorteiosComponent } from 'app/sorteios/sorteios.component';
import { GanhadoresComponent } from 'app/ganhadores/ganhadores.component';
import { BannerComponent } from 'app/banner/banner.component';
import { FinanceiroComponent } from 'app/financeiro/financeiro.component';
import { MsgWhattsComponent } from 'app/msg-whatts/msg-whatts.component';
import { RelatorioFinanceiroComponent } from 'app/relatorio-financeiro/relatorio-financeiro.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'clientes',       component: ClientesComponent },
    { path: 'sorteios',       component: SorteiosComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'compras',        component: ComprasComponent },
    { path: 'financeiro',     component: FinanceiroComponent },
    { path: 'relatorio-financeiro',     component: RelatorioFinanceiroComponent },
    { path: 'ganhadores',     component: GanhadoresComponent },
    { path: 'banner',         component: BannerComponent },
    { path: 'msg-whatts',     component: MsgWhattsComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
];
