import { NgModule } from '@angular/core';
import {
  components,
  CrudRoutingModule,
  providers,
} from './crud-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddBookMarkComponent } from './add-bookmark/add-bookmark.component';

@NgModule({
  declarations: [components],
  imports: [SharedModule, CrudRoutingModule],
  exports: [AddBookMarkComponent],
  providers: [providers],
})
export class CrudModule {}
