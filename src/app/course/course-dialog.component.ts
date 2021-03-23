import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course, VMmodel} from './course.model';
import {Subscription} from 'rxjs';
import {CourseService} from './course.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private readonly _save$ = new EventEmitter<Course>();
  @Output() readonly save$ = this._save$.asObservable();

  @Input() name = '';

  @Input() acronym = '';

  @Input() enabled = false;

  @Input() max = 1;

  @Input() min = 1;

  @Input() isNew = true;

  @Input() model;

  @Input() models: VMmodel[];

  modelName: string;

  private getSub: Subscription;

  uploadForm: FormGroup;
  canUpload = false;

  @Input() set course(c: Course | null) {
    if (c !== null) {
      this.setupCourse(c);
    } else {
      this.setupNew();
    }
  }

  constructor(private formBuilder: FormBuilder,
              private readonly courseService: CourseService) {
  }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
    this.getSub = this.courseService.getVMmodels().subscribe(next => this.models = next);
  }

  private setupNew() {
    this.name = '';
    this.acronym = '';
    this.enabled = false;
    this.max = 1;
    this.min = 1;
    this.isNew = true;
    this.model = null;
  }

  private setupCourse(c: Course) {
    this.name = c.name;
    this.acronym = c.acronym;
    this.enabled = c.enabled;
    this.max = c.max;
    this.min = c.min;
    this.isNew = false;
    this.model = c.virtualMachineModel;
  }

  save() {
    const course = {
      name: this.name,
      acronym: this.acronym,
      enabled: this.enabled,
      max: this.max,
      min: this.min,
      virtualMachineModel: this.model
    };
    this._save$.emit(course);
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
    formData.append('name', this.modelName);
    formData.append('file', this.uploadForm.get('profile').value);
    this.courseService.createVMmodel(formData).subscribe(next => this.models.push(next));
  }

}
