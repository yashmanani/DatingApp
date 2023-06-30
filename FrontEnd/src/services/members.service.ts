import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from 'src/models/member';
import { MemberUpdate } from 'src/models/memberUpdate';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl: string = environment.apiUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) { }

  getMembers(fromCache: boolean = true) {
    if (fromCache && this.members.length > 0)
      return of(this.members);
    return this.http.get<Member[]>(`${this.baseUrl}users`).pipe(
      map((members: Member[]) => {
        this.members = members;
        return members;
      })
    );
  }

  getMember(username: string, fromCache: boolean = true) {
    const member = this.members.find(x => x.userName === username);
    if (fromCache && member)
      return of(member);
    return this.http.get<Member>(`${this.baseUrl}users/${username}`);
  }

  updateMember(member: MemberUpdate) {
    return this.http.put(`${this.baseUrl}users`, member);
  }
}
