import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl: string = environment.apiUrl;

  private currentUserSource: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {

  }

  login(model: any) {
    return this.http.post<User>(this.baseUrl.concat("account/login"), model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.setCurrentUser(user);
        }
        return response;
      })
    );
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl.concat("account/register"), model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.setCurrentUser(user);
        }
        return user;
      })
    )
  }

  logout() {
    localStorage.removeItem('user');
    this.setCurrentUser(null);
  }

  setCurrentUser(user: User | null) {
    this.currentUserSource.next(user);
  }
}
