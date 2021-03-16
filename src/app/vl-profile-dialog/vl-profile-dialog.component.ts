import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {User} from '../auth/user.model';
import {VlService} from '../vl.service';

@Component({
  selector: 'app-vl-profile-dialog',
  templateUrl: './vl-profile-dialog.component.html',
  styleUrls: ['./vl-profile-dialog.component.css']
})
export class VlProfileDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: User,
              private readonly vlService: VlService) {}

  profile: User;
  loading = true;

  ngOnInit(): void {
    this.vlService.getUserProfile(this.data.username).subscribe(next => {
      this.profile = next;
      this.loading = false;
    });
  }

}
