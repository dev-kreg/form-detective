import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm: FormGroup;
  submitAttempt = false;
  submitLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitAttempt = true;
    if (this.loginForm.valid) {
      this.submitLoading = true;
      this.authService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value).subscribe(
        {
          next: (v) => {
            this.router.navigate(['/dashboard'])
          },
          error: (e) => console.error(e),
          complete: () => this.submitLoading = false
        });
    }
  }
}