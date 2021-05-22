import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(public authService: AuthService) {}

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
    // confirmPassword: new FormControl('', [Validators.required, this.confirmEquals()])
  });

  // confirmEquals(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null =>
  //     control.value?.toLowerCase() === this.passwordValue.toLowerCase() ? null : { noMatch: true };
  // }

  // get passwordValue() {
  //   return this.registerForm.get('password').value;
  // }

  ngOnInit(): void {
    console.log(this.registerForm.get('password').value);
  }

  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }

    this.authService.register(
      this.registerForm.get('name').value,
      this.registerForm.get('email').value,
      this.registerForm.get('password').value
    );
  }
}

// login user if all is ok
