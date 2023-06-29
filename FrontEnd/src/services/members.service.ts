import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from 'src/models/member';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMembers() {
    return this.http.get<Member[]>(`${this.baseUrl}users`);
  }

  getMember(username: string) {
    return this.http.get<Member>(`${this.baseUrl}users/${username}`);
  }
}
