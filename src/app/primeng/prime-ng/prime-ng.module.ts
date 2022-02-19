import { NgModule } from '@angular/core';

import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {CalendarModule} from 'primeng/calendar';
import {MenubarModule} from 'primeng/menubar';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SelectButtonModule} from 'primeng/selectbutton';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
// Chartjs
import {ChartModule} from 'primeng/chart';

@NgModule({
  exports: [
    ButtonModule,
    CalendarModule,
    CardModule,
    ChartModule,
    MenubarModule,
    PasswordModule,
    InputTextModule,
    SelectButtonModule,
    TableModule,
    ToastModule,
    VirtualScrollerModule,
    RadioButtonModule
  ],
})
export class PrimeNgModule { }
