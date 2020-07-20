import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Course} from '../model/course.model';
import {MatSidenav} from '@angular/material/sidenav';
import {User} from '../model/user.model';

@Component({
    selector: 'app-vl-sidenav',
    templateUrl: './vl-sidenav.component.html',
    styleUrls: ['./vl-sidenav.component.css']
})
export class VlSidenavComponent implements OnInit {

    @ViewChild('sidenav') private readonly sidenav: MatSidenav;

    // tslint:disable-next-line:variable-name
    private readonly _delete$ = new EventEmitter<Course>();
    @Output() readonly delete$ = this._delete$.asObservable();

    // tslint:disable-next-line:variable-name
    private readonly _create$ = new EventEmitter<any>();
    @Output() readonly create$ = this._create$.asObservable();

    // tslint:disable-next-line:variable-name
    private readonly _update$ = new EventEmitter<Course>();
    @Output() readonly update$ = this._update$.asObservable();

    @Input() courses: Course[] = [];

    @Input() set user(user: User | null) {
        this.editable = user !== null &&
            user.roles.find((r) => {
                return r === 'ROLE_ADMIN';
            }) !== undefined;
    }

    @Input() editable = false;

    constructor() {
    }

    ngOnInit(): void {
    }

    toggle() {
        this.sidenav.toggle().then();
    }

    update(c: Course) {
        this._update$.emit(c);
    }

    create() {
        this._create$.emit(null);
    }

    delete(c: Course) {
        this._delete$.emit(c);
    }

}
