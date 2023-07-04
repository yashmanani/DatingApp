import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GalleryModule } from 'ng-gallery';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
    MatTabsModule,
    GalleryModule,
    NgxSpinnerModule.forRoot({
      type: 'ball-pulse'
    })
  ],
  exports: [
    ToastrModule,
    MatTabsModule,
    GalleryModule,
    NgxSpinnerModule
  ]
})
export class SharedModule { }
