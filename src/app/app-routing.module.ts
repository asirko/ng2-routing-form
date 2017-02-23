import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Erreur404Component } from './erreur404/erreur404.component';
import { ProfileModule } from './profile/profile.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }, {
    path: 'home',
    component: HomeComponent
  }, {
    path: '**',
    component: Erreur404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ProfileModule],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
