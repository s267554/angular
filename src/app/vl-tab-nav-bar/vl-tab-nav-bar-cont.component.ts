import {Component, OnDestroy, OnInit} from '@angular/core';
import {Tab} from './tab.model';
import {AuthService} from '../auth/auth.service';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {isAdmin} from '../auth/user.model';
import {VlService} from '../vl.service';

const ADMIN_TABS: Tab[] = [
  {
    title: 'Students',
    path: '/students'
  },
  {
    title: 'Groups',
    path: '/groups'
  }
];

const USER_TABS: Tab[] = [
  {
    title: 'Groups',
    path: '/groups'
  },
  {
    title: 'VMs',
    path: '/vms'
  }
];

@Component({
  selector: 'app-vl-tab-nav-bar-cont',
  templateUrl: './vl-tab-nav-bar-cont.component.html',
  styleUrls: ['./vl-tab-nav-bar-cont.component.css']
})
export class VlTabNavBarContComponent implements OnInit, OnDestroy {

  readonly course$: Observable<string>;

  readonly tabs$: Observable<Tab[]>;

  // tslint:disable-next-line:variable-name
  private _sub: Subscription = null;

  constructor(private readonly authService: AuthService,
              private readonly vlService: VlService,
              private readonly route: ActivatedRoute) {
    this.course$ = route.params.pipe(
      map((params) => {
        return params.courseName;
      })
    );
    this.tabs$ = authService.loginEvent$.pipe(
      map((u) => {
        return isAdmin(u) ? ADMIN_TABS : USER_TABS;
      })
    );
  }

  ngOnInit(): void {
    this._sub = this.course$.subscribe(n => this.vlService.selectCourse(n));
  }

  ngOnDestroy(): void {
    if (this._sub !== null) {
      this._sub.unsubscribe();
      this._sub = null;
    }
  }


}
