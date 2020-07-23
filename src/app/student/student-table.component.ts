import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Student} from './student.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {StudentDataSource} from './student.data-source';
import {MatTable} from '@angular/material/table';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) private readonly paginator: MatPaginator;
  @ViewChild(MatTable) private readonly table: MatTable<Student>;
  @ViewChild(MatSort) private readonly sort: MatSort;

  // tslint:disable-next-line:variable-name
  private readonly _deleteAll = new EventEmitter<Student[]>();
  @Output() readonly deleteAll = this._deleteAll.asObservable();

  @Input() set students(students: Student[]) {
    this.dataSource.emit(students);
    this.selected.clear();
  }

  @Input() columns = ['select', 'id', 'name', 'surname'];

  readonly dataSource = new StudentDataSource();

  private selected = new Set<Student>();

  private subs: Subscription[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.subs.push(
      this.dataSource.page$.subscribe((p) => {
        this.selected.forEach((value, key, set) => {
          if (p.find((s) => s.id === value.id) === undefined) {
            set.delete(key);
          }
        });
      })
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;
  }

  isOneSelected(student: Student): boolean {
    return this.selected.has(student);
  }

  areAllSelected(): boolean {

    let areAllSelected = true;

    const students = this.dataSource.getPage();
    let index = 0;

    while (areAllSelected && index < students.length) {
      const student = students[index++];
      areAllSelected = areAllSelected && this.selected.has(student);
    }

    return areAllSelected;
  }

  toggleOne(student: Student, checked: boolean) {
    if (!checked) {
      this.selected.delete(student);
    } else {
      this.selected.add(student);
    }
  }

  toggleAll(checked: boolean) {
    if (checked) {
      const students = this.dataSource.getPage();
      students.forEach((s) => {
        this.selected.add(s);
      });
    } else {
      this.selected.clear();
    }
  }

  isIndeterminate(): boolean {
    const size = this.selected.size;
    const maxSize = this.dataSource.getPage().length;
    return size > 0 && size < maxSize;
  }

  deleteAllSelected() {
    const students = [];
    this.selected.forEach((s) => students.push(s));
    this._deleteAll.emit(students);
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => {
      s.unsubscribe();
    });
    this.subs = [];
  }

}


