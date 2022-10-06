import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AddBookMarkComponent } from './add-bookmark/add-bookmark.component';


export const components = [AddBookMarkComponent];

export const providers = [];

const routes: Routes = [

  { path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudRoutingModule {}
