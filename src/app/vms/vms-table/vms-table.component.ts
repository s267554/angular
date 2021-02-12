import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VirtualMachine} from '../virtual-machine';
import {AuthService} from '../../auth/auth.service';
import {Student} from '../../student/student.model';

@Component({
  selector: 'app-vms-table',
  templateUrl: './vms-table.component.html',
  styleUrls: ['./vms-table.component.css']
})
export class VmsTableComponent implements OnInit {

  @Input() displayedColumns: string[] = ['id', 'status', 'url'];

  @Input() vms: VirtualMachine[] = [];

  user: string;

  // tslint:disable-next-line:variable-name
  private readonly _selectVM$ = new EventEmitter<VirtualMachine>();
  @Output() readonly selectVM$ = this._selectVM$.asObservable();

  // tslint:disable-next-line:variable-name
  private readonly _updateVM$ = new EventEmitter<VirtualMachine>();
  @Output() readonly updateVM$ = this._updateVM$.asObservable();

  // tslint:disable-next-line:variable-name
  private readonly _powerVM$ = new EventEmitter<VirtualMachine>();
  @Output() readonly powerVM$ = this._powerVM$.asObservable();

  // tslint:disable-next-line:variable-name
  private readonly _deleteVM$ = new EventEmitter<VirtualMachine>();
  @Output() readonly deleteVM$ = this._deleteVM$.asObservable();

  constructor(private readonly authService: AuthService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getUserId();
  }

  selectVM(vm: VirtualMachine) {
    // this._selectVM$.emit(vm);
  }

  updateVM(vm: VirtualMachine) {
    this._updateVM$.emit(vm);
  }

  powerVM(vm: VirtualMachine) {
    this._powerVM$.emit(vm);
  }

  deleteVM(vm: VirtualMachine) {
    this._deleteVM$.emit(vm);
  }

  isOwner(vm: VirtualMachine) {
    return vm.owners.map(value => value.id).includes(this.user);
  }
}
