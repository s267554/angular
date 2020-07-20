import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {VlService} from '../service/vl.service';
import {Subscription} from 'rxjs';
import {VlSidenavComponent} from './vl-sidenav.component';
import {CourseService} from '../service/course.service';
import {AuthService} from '../auth/auth.service';
import {Course} from '../model/course.model';

@Component({
  selector: 'app-vl-sidenav-cont',
  templateUrl: './vl-sidenav-cont.component.html',
  styleUrls: ['./vl-sidenav-cont.component.css']
})
export class VlSidenavContComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('sidenav') private readonly vlSidenav: VlSidenavComponent;
  private subscriptions: Subscription[] = [];

  constructor(private readonly vlService: VlService,
              readonly courseService: CourseService,
              readonly authService: AuthService) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
    this.subscriptions = [];
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.vlService.sidenav$.subscribe(() => {
        this.vlSidenav.toggle();
      })
    );
  }

  deleteCourse(c: Course) {
    this.subscriptions.push(
      this.courseService.deleteCourse(c).subscribe((e) => {

      })
    );
  }

  updateCourse(c: Course) {

  }

  createCourse() {

  }

}
