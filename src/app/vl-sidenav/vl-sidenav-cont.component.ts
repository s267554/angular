import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {VlService} from '../service/vl.service';
import {Subscription} from 'rxjs';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-vl-sidenav-cont',
  templateUrl: './vl-sidenav-cont.component.html',
  styleUrls: ['./vl-sidenav-cont.component.css']
})
export class VlSidenavContComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') private readonly sidenav: MatSidenav;
  private sub: Subscription = null;

  constructor(private readonly vlService: VlService) {
  }

  ngOnInit(): void {
    this.sub = this.vlService.sidenav$.subscribe(() => {
      this.sidenav.toggle().then();
    });
  }

  ngOnDestroy(): void {
    if (this.sub !== null) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }

}
