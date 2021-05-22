import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    console.log(this.registerForm.get('password').value);
  }

  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }

    this.authService
      .register(
        this.registerForm.get('name').value,
        this.registerForm.get('email').value,
        this.registerForm.get('password').value
      )
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}

// login user if all is ok
