import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'app/models/login';
import { AuthenticationService } from 'app/services/login.service';
import { NotificationService } from 'app/services/toast.service';

@Component({
  selector: 'login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  @Input() public loginCliente: Login;

  constructor(private authenticationService: AuthenticationService,private router: Router, private route: ActivatedRoute
    , private alertService: NotificationService) { }

  ngOnInit(): void {
    this.loginCliente = new Login();
  }

  login() {
    this.authenticationService.authenticateAdmin(this.loginCliente).subscribe(
      (result) => {
        if (result) {
          this.router.navigate(['admin/dashboard']);
        } else {
          this.alertService.showError('Usuário e Senha inválidos!','Erros');
        }
      }
    )
  }

}
