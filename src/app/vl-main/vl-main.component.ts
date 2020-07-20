import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {CourseService} from '../service/course.service';

@Component({
  selector: 'app-vl-main',
  templateUrl: './vl-main.component.html',
  styleUrls: ['./vl-main.component.css']
})
export class VlMainComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  title = '';

  constructor(private readonly courseService: CourseService,
              private readonly route: ActivatedRoute,
              private readonly router: Router) {
    this.subs.push(
      this.route.params.subscribe((params) => {
        this.title = params.courseName;
      })
    );
  }

  ngOnInit(): void {
    this.subs.push(
      this.courseService.getCourses().subscribe((courses) => {
        const c = courses !== null && courses !== undefined && courses.length > 0 ? courses[0] : null;
        if (c !== null) {
          const url = './' + c.name + '/students';
         // this.router.navigate([url]).then();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => {
      s.unsubscribe();
    });
    this.subs = [];
  }

}
