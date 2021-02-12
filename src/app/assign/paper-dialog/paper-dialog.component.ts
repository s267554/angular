import {Component, EventEmitter, Input, OnInit, Output, Version} from '@angular/core';
import {Assignment} from '../assign.model';
import {Paper} from '../paper.model';

@Component({
  selector: 'app-paper-dialog',
  templateUrl: './paper-dialog.component.html',
  styleUrls: ['./paper-dialog.component.css']
})
export class PaperDialogComponent implements OnInit {

  @Input() set paper(p: Paper) {
    this.vote = p.vote;
    this.final = !p.enabled;
    this.oldPaper = p;
  }

// tslint:disable-next-line:variable-name
  private readonly _save$ = new EventEmitter<Paper>();
  @Output() readonly save$ = this._save$.asObservable();

  constructor() {
  }

  oldPaper: Paper;

  // ridondanza
  vote: number;

  final: boolean;

  save() {
    const paper: Paper = {...this.oldPaper};
    paper.status = 'RIVISTO';
    paper.enabled = !this.final;
    paper.vote = this.vote;
    this._save$.emit(paper);
  }

  ngOnInit(): void {
  }
}
