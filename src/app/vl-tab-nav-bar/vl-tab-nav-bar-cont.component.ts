import {Component, OnInit} from '@angular/core';
import {Tab} from './tab.model';
import {AuthService} from '../auth/auth.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {isAdmin} from '../auth/user.model';

const ADMIN_TABS: Tab[] = [
  {
    title: 'Students',
    path: '/students'
  },
  {
    title: 'Groups',
    path: '/groups'
  },
  {
    title: 'VMs',
    path: '/vms'
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
export class VlTabNavBarContComponent implements OnInit {

  readonly title$: Observable<string>;

  readonly tabs$: Observable<Tab[]>;

  constructor(private readonly authService: AuthService,
              private readonly route: ActivatedRoute) {
    this.title$ = route.params.pipe(
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
  }

}
