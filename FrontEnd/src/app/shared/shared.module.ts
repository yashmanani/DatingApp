import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
    MatTabsModule,
    NgxGalleryModule
  ],
  exports: [
    ToastrModule,
    MatTabsModule,
    NgxGalleryModule
  ]
})
export class SharedModule { }
