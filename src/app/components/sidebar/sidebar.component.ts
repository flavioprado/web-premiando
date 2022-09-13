import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/services/login.service';
import { NotificationService } from 'app/services/toast.service';

declare const $: any;
declare interface RouteSubMenuInfo {
  path: string;
  title: string;
  icon: string;
}
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    subMenu: RouteSubMenuInfo[];
    isCollapsed: boolean;
}
export const ROUTES: RouteInfo[] = [
    { path: 'admin/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '', subMenu: [], isCollapsed: false },
    { path: 'admin/clientes', title: 'Clientes',  icon:'supervisor_account', class: '', subMenu: [], isCollapsed: false },
    { path: 'admin/compras', title: 'Compras',  icon:'shopping_cart', class: '', subMenu: [], isCollapsed: false },
    // { path: 'admin/icons', title: 'Financeiro',  icon:'trending_up', class: '' },
    { path: 'admin/sorteios', title: 'Sorteios',  icon:'grade', class: '', subMenu: [], isCollapsed: false },
    { path: 'admin/ganhadores', title: 'Ganhadores',  icon:'emoji_events', class: '', subMenu: [], isCollapsed: false },
    { path: 'admin/financeiro', title: 'Financeiro',  icon:'account_balance', class: '', subMenu: [
    { path: 'admin/relatorio-financeiro', title: 'Relatórios', icon:''}], isCollapsed: false },
    { path: 'admin/banner', title: 'Banner',  icon:'settings', class: '' , subMenu: [], isCollapsed: false},
    { path: 'admin/msg-whatts', title: 'Mensg. WhatsApp',  icon:'whatsapp', class: '' , subMenu: [], isCollapsed: false},
    // { path: 'admin/notifications', title: 'Ganhadores',  icon:'emoji_events', class: '' },
    // { path: 'admin/upgrade', title: 'Campanha SMS',  icon:'question_answer', class: '' },
    // { path: 'admin/upgrade', title: 'Website',  icon:'language', class: '' },
    // { path: 'admin/upgrade', title: 'Configurações',  icon:'settings', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private router: Router,private authenticationService: AuthenticationService, private alertService: NotificationService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  logout() {
    this.authenticationService.logoutAdmin();
    this.alertService.showWarning('Logout Realizado Com Sucesso','')
    this.router.navigate(['login-admin']);
  }

  updateCollapsed(menu: RouteInfo){
    menu.isCollapsed = !menu.isCollapsed;
  }
}
