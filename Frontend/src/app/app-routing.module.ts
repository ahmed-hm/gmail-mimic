import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './core/guard/login.guard';

const routes: Routes = [
  {
    path: 'emails',
    canActivate: [LoginGuard],
    loadChildren: () => import('./modules/emails/emails.module').then((m) => m.EmailsModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  { path: '', redirectTo: 'emails', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
