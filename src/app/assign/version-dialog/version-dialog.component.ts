import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Version} from '../version.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {VlService} from '../../vl.service';
import {Assignment} from '../assign.model';

@Component({
  selector: 'app-version-dialog',
  templateUrl: './version-dialog.component.html',
  styleUrls: ['./version-dialog.component.css']
})
export class VersionDialogComponent implements OnInit {

// tslint:disable-next-line:variable-name
  private readonly _save$ = new EventEmitter<any>();
  @Output() readonly save$ = this._save$.asObservable();

  uploadForm: FormGroup;
  canUpload = false;

  constructor(private formBuilder: FormBuilder) {
  }

  save() {
    const v: Version = {
      date: new Date(),
      contentUrl: '',
      id: 0
    };

    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);
    formData.append('request', JSON.stringify(v));

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
