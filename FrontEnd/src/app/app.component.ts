import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { User } from '../models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'FrontEnd';

  constructor(private accountService: AccountService) {

  }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString: string | null = localStorage.getItem("user");
    if (!userString)
      this.accountService.setCurrentUser(null);
    else {
      const user: User = JSON.parse(userString);
      this.accountService.setCurrentUser(user);
    }
  }
}
