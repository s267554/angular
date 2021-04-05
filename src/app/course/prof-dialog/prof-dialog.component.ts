import {Component, Inject, OnInit} from '@angular/core';
import {ProfessorViewModel} from '../prof.view-model';
import {Student} from '../../student/student.model';
import {StudentViewModel} from '../../student/student.view-model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Course} from '../course.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-prof-dialog',
  templateUrl: './prof-dialog.component.html',
  styleUrls: ['./prof-dialog.component.css'],
  providers: [ProfessorViewModel]
})
export class ProfDialogComponent implements OnInit {

  constructor(readonly professorViewModel: ProfessorViewModel,
              @Inject(MAT_DIALOG_DATA) readonly data: Course,
              private readonly dialogRef: MatDialogRef<ProfDialogComponent>) { }

  courseName = this.data.name;

  subs: Subscription[] = [];
  errorMsg: any;

  ngOnInit(): void {
    this.subs.push(
      this.professorViewModel.getInCharge(this.courseName).subscribe()
    );
  }

  search($event: any) {
    this.subs.push(this.professorViewModel.search($event).subscribe());
  }

  putInCharge($event: Student) {
    this.professorViewModel.putInCharge($event);
  }

  discharge($event: Student[]) {
    this.professorViewModel.discharge($event);
  }

  save() {
    this.subs.push(this.professorViewModel.save(this.data)
      .subscribe(ok => this.dialogRef.close(),
          error => this.errorMsg = error.error.message)
    );
  }
}
