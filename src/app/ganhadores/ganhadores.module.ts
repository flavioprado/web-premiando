import { NgModule } from '@angular/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { GanhadoresComponent } from './ganhadores.component';

@NgModule({
  imports: [
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [],
  providers: [],
  bootstrap: [GanhadoresComponent]
})
export class GanhadoresModule { }
