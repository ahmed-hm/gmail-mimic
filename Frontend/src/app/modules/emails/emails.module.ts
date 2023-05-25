import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EmailListComponent } from './controllers/email-list/email-list.component';
import { EmailsRoutingModule } from './emails-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { EmailDetailsComponent } from './controllers/email-details/email-details.component';

@NgModule({
  declarations: [EmailListComponent, EmailDetailsComponent],
  imports: [CommonModule, EmailsRoutingModule, PaginationModule.forRoot(), FormsModule, ReactiveFormsModule],
})
export class EmailsModule {}
