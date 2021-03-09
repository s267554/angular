import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {VirtualMachine} from '../../vms/virtual-machine';
import {Assignment} from '../assign.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {switchMap} from 'rxjs/operators';
import {VlService} from '../../vl.service';

@Component({
  selector: 'app-assign-dialog',
  templateUrl: './assign-dialog.component.html',
  styleUrls: ['./assign-dialog.component.css']
})
export class AssignDialogComponent implements OnInit {

// tslint:disable-next-line:variable-name
  private readonly _save$ = new EventEmitter<Assignment>();
  @Output() readonly save$ = this._save$.asObservable();

  uploadForm: FormGroup;
  canUpload = false;

  constructor(private formBuilder: FormBuilder,
              private readonly vlSerivce: VlService) {
  }

  expiry: Date;

  url: string;

  save() {
    const a: Assignment = {
      creationDate: this.expiry,
      expiryDate: this.expiry,
      id: 0,
      contentUrl: this.url,
    };
    this._save$.emit(a);
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
      this.canUpload = true;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);

    this.vlSerivce.uploadImage(formData).subscribe(link => {
      this.url = link;
    });
  }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }
}
