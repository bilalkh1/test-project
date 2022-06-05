import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(''),
    });
  }

  onSubmit() {
    console.log(this.registerForm.valid);
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (res: any) => {
          console.log(res);
          localStorage.setItem('token', res.token);
        },
        (err) => {
          console.log(err);
        }
      );
    }else {

    }
    // this.registerForm.reset();
  }

  logout() {
    localStorage.removeItem('token');
  }

}
