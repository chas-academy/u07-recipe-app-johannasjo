import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

// check if email is already registered
// check that password matches
// login user if all is ok
// otherwise return error message
