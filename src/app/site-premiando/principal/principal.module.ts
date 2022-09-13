import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { PrincipalComponent } from './principal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from 'app/app.routing';
import { NgxMaskModule } from 'ngx-mask';

export const routes = [
    { path: '', component: PrincipalComponent }
];


@NgModule({
  declarations: [
    PrincipalComponent
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
export class PrincipalModule { }
