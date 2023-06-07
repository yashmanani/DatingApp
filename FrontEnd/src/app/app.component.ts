import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'FrontEnd';
  users: any;

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get("https://localhost:7039/api/Users").subscribe({
      next: (value: any) => this.users = value,
      error: (err) => console.log(err)
    })
  }
}
