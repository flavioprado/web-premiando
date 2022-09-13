import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/services/login.service';
import { LoginRegysterComponent } from '../login/login-regyster/login-regyster.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  menuMobileOpened: boolean = false;

  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute,
               private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  openLoginDialog(){
    const dialogRef = this.dialog.open(LoginRegysterComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openLoginDialogMobile(){
    this.openMenuMobile(false);
    const dialogRef = this.dialog.open(LoginRegysterComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['principal']);
    });
  }

  navigateTo(rota: string){
    this.openMenuMobile(false);
    this.router.navigate([rota]);
  }

  isUserLogged(){
    let currentUser = localStorage.getItem('currentUser');
    if(currentUser){
      return true;
    }
    return false;
  }

  loggout(){
    this.authenticationService.logout();
    this.openMenuMobile(false);
    this.router.navigate(['principal']);
  }

  loggoutMobile(){
    this.authenticationService.logout();
    this.openMenuMobile(false);
    this.router.navigate(['principal']);
  }

  openMenuMobile(open: boolean) {
    if(!open){
      document.getElementById('menuMobile').classList.remove('menu-mobile-aberto')
    } else {
      document.getElementById('menuMobile').classList.add('menu-mobile-aberto')
    }
  }

}
