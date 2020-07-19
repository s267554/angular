import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  hide = true;
  email = '';
  password = '';
  loginError = false;

  constructor(
    private readonly dialogRef: MatDialogRef<LoginDialogComponent>,
    private readonly authService: AuthService
  ) {

  }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      () => {
        this.dialogRef.close(true);
      },
      () => {
        this.loginError = true;
      }
    );
  }

  ngOnInit() {
  }

}
