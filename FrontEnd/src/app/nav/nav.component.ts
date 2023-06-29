import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(public accountService: AccountService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: (value: User) => {
        this.router.navigateByUrl('/members');
      },
      error: (error) => console.error(error)
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
