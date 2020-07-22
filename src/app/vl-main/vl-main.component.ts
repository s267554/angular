import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {CourseService} from '../course/course.service';
import {VlService} from '../vl.service';
import {MatSidenav} from '@angular/material/sidenav';


@Component({
  selector: 'app-vl-main',
  templateUrl: './vl-main.component.html',
  styleUrls: ['./vl-main.component.css']
})
export class VlMainComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('sidenav') private readonly sidenav: MatSidenav;

  private subs: Subscription[] = [];

  constructor(private readonly courseService: CourseService,
              readonly vlService: VlService) {

  }

  ngOnInit(): void {
    this.subs.push(
      this.courseService.getCourses().subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => {
      s.unsubscribe();
    });
    this.subs = [];
  }

  ngAfterViewInit(): void {
    this.subs.push(
      this.vlService.sidenav$.subscribe(() => {
        this.sidenav.toggle().then();
      })
    );
  }

}
