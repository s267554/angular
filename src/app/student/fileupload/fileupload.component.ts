import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {StudentService} from '../student.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {

  uploadForm: FormGroup;
  canUpload = false;
  private readonly parentRoute: ActivatedRoute;

  constructor(private formBuilder: FormBuilder,
              private readonly studentService: StudentService,
              route: ActivatedRoute) {
    this.parentRoute = route.parent;
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

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);
    this.parentRoute.params.pipe(
      switchMap((p) => {
        return this.studentService.enrollManyStudents(p.courseName, formData);
      })
    ).subscribe();
  }

}
