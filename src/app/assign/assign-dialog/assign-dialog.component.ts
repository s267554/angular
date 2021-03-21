import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Assignment} from '../assign.model';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-assign-dialog',
  templateUrl: './assign-dialog.component.html',
  styleUrls: ['./assign-dialog.component.css']
})
export class AssignDialogComponent implements OnInit {

// tslint:disable-next-line:variable-name
  private readonly _save$ = new EventEmitter<any>();
  @Output() readonly save$ = this._save$.asObservable();

  uploadForm: FormGroup;
  canUpload = false;

  constructor(private formBuilder: FormBuilder) {
  }

  expiry: Date;

  save() {
    const a: Assignment = {
      creationDate: this.expiry,
      expiryDate: this.expiry,
      id: 0,
      contentUrl: '',
    };

    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);
    formData.append('request', JSON.stringify(a));

    this._save$.emit(formData);
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
      this.canUpload = true;
    }
  }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }
}
