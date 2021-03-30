import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../course/course.service';
import {VlService} from '../../vl.service';

@Component({
  selector: 'app-vms-stud-tab',
  templateUrl: './vms-stud-tab.component.html',
  styleUrls: ['./vms-stud-tab.component.css']
})
export class VmsStudTabComponent implements OnInit {

  enabled: boolean;

  constructor(private readonly vlService: VlService,
              private readonly courseService: CourseService) { }

  ngOnInit(): void {
    this.enabled = this.courseService.getCourse(this.vlService.getCourse()).enabled;
  }

}
