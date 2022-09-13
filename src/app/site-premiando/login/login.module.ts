import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask';
import { LoginRegysterComponent } from './login-regyster/login-regyster.component';

export const routes = [
    { path: '', component: LoginRegysterComponent }
];


@NgModule({
  declarations: [
    LoginRegysterComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
  ]
})
export class LoginModule { }
