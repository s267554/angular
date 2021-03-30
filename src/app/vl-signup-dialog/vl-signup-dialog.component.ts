import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthService} from '../auth/auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-vl-signup-dialog',
  templateUrl: './vl-signup-dialog.component.html',
  styleUrls: ['./vl-signup-dialog.component.css']
})
export class VlSignupDialogComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<VlSignupDialogComponent>,
    private readonly authService: AuthService
  ) {

  }

  hide = true;
  name = '';
  surname = '';
  email = '';
  password = '';
  confirm = '';
  loginError = '';
  id = '';

  uploadForm: FormGroup;
  canUpload = false;

  signup() {
    this.loginError = '';
    const request = {
      id: this.id,
      email: this.email,
      name: this.name,
      surname: this.surname,
      password1: this.password,
      password2: this.confirm,
    };

    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);
    formData.append('request', JSON.stringify(request));

    this.authService.register(formData).subscribe(
      (user) => {
        this.dialogRef.close(user);
      },
      (error) => {
        this.loginError = error;
      }
    );
  }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
      this.canUpload = true;
    }
  }
}
