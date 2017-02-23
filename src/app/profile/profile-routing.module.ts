import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { ProfileService } from "./profile.service";

export const profileRoutes: Routes = [
  {
    path: 'profile',
    component: ListComponent
  }, {
    path: 'profile/:id',
    component: DetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  exports: [RouterModule],
  providers: [ProfileService]
})
export class ProfileRoutingModule { }
