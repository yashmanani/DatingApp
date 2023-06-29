import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit {
  baseUrl = "https://localhost:7039/api/";

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    console.log("errors loaded")
  }

  get404Error() {
    this.http.get(this.baseUrl.concat("buggy/not-found")).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error)
    })
  }

  get400Error() {
    this.http.get(this.baseUrl.concat("buggy/bad-request")).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error)
    })
  }

  get500Error() {
    this.http.get(this.baseUrl.concat("buggy/server-error")).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error)
    })
  }

  get401Error() {
    this.http.get(this.baseUrl.concat("buggy/auth")).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error)
    })
  }

  get400ValidationError() {
    this.http.post(this.baseUrl.concat("account/register"), {}).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error)
    })
  }

}
