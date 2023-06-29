import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/models/user';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  register() {
    this.accountService.register(this.model).subscribe({
      next: (value: User) => {
        this.cancel();
      },
      error: (err) => {
        console.error(err)
        this.toastr.error(err.error)
      }
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
