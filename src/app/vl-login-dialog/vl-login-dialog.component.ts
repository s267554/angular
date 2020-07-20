import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-vl-login-dialog',
  templateUrl: './vl-login-dialog.component.html',
  styleUrls: ['./vl-login-dialog.component.css']
})
export class VlLoginDialogComponent implements OnInit {
  hide = true;
  email = '';
  password = '';
  loginError = false;

  constructor(
    private readonly dialogRef: MatDialogRef<VlLoginDialogComponent>,
    private readonly authService: AuthService
  ) {

  }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (user) => {
        this.dialogRef.close(user);
      },
      () => {
        this.loginError = true;
      }
    );
  }

  ngOnInit() {
  }

}
