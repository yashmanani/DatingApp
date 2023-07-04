import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, ImageItem, Gallery, GalleryRef, GalleryComponent } from 'ng-gallery';
import { Member } from 'src/models/member';
import { MembersService } from 'src/services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  galleryRef: GalleryRef;
  member: Member | undefined;

  constructor(private memberService: MembersService, private route: ActivatedRoute, private gallery: Gallery) {
    this.galleryRef = this.gallery.ref('imageGallery');
  }

  ngOnInit(): void {
    this.getMember();
    this.galleryRef.indexChanged.subscribe({
      next: _ => console.log(document.getElementsByTagName("gallery-item"))
    })
  }

  getMember() {
    const username = this.route.snapshot.paramMap.get("username");
    if (!username)
      return;
    this.memberService.getMember(username).subscribe({
      next: (value: Member) => {
        this.member = value;
        this.member.photos.forEach((photo) => {
          this.galleryRef.addImage({ src: photo.url, thumb: photo.url });
          console.log(document.getElementsByTagName("gallery-item"));
        });
      }
    })
  }
}
