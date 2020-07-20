import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {VlService} from '../service/vl.service';
import {Subscription} from 'rxjs';
import {VlSidenavComponent} from './vl-sidenav.component';

@Component({
  selector: 'app-vl-sidenav-cont',
  templateUrl: './vl-sidenav-cont.component.html',
  styleUrls: ['./vl-sidenav-cont.component.css']
})
export class VlSidenavContComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('sidenav') private readonly vlSidenav: VlSidenavComponent;
  private sub: Subscription = null;

  constructor(private readonly vlService: VlService) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this.sub !== null) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }

  ngAfterViewInit(): void {
    this.sub = this.vlService.sidenav$.subscribe(() => {
      this.vlSidenav.toggle();
    });
  }

}
