import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from 'app/services/login.service';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor( private router: Router, private authentcationService: AuthenticationService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const currentUser = this.authentcationService.currentUserValue;
    const currentUserAdmin = this.authentcationService.currentUserAdminValue;
    if(currentUser.isLogged){
      return true;
    }
    if(currentUserAdmin.isLogged){
      return true;
    }

    //this.router.navigate([''], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
