import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { FormModel } from 'src/models/formModel';
import { Member } from 'src/models/member';
import { MemberUpdate } from 'src/models/memberUpdate';
import { User } from 'src/models/user';
import { AccountService } from 'src/services/account.service';
import { MembersService } from 'src/services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.memberForm?.dirty)
      $event.returnValue = false;
  }

  member: Member | undefined;
  user: User | null = null;
  memberForm: FormGroup;

  constructor(private accountService: AccountService, private memberService: MembersService, private toastr: ToastrService, private fb: FormBuilder) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (value: User | null) => this.user = value
    })

    const form: FormModel<MemberUpdate> = {
      city: [''],
      country: [''],
      interests: [''],
      introduction: [''],
      lookingFor: ['']
    }

    this.memberForm = this.fb.group(form);
  }

  ngOnInit(): void {
    this.getMember();
  }

  getMember(fromCache: boolean = true) {
    if (!this.user)
      return;
    this.memberService.getMember(this.user.username, fromCache).subscribe({
      next: (value: Member) => {
        this.memberForm.patchValue(value);
        this.member = value;
      }
    })
  }

  updateMember() {
    this.memberService.updateMember(this.memberForm.value).subscribe({
      next: _ => {
        this.toastr.success('Profile updated successfully');
        this.memberForm.reset(this.memberForm.value);
        this.getMember(false);
      }
    });
  }
}