import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailDetailsComponent } from './controllers/email-details/email-details.component';
import { EmailListComponent } from './controllers/email-list/email-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: EmailListComponent,
  },
  {
    path: ':id',
    component: EmailDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailsRoutingModule {}
