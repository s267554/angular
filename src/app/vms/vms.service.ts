import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {VirtualMachine} from './virtual-machine';
import {HttpClient} from '@angular/common/http';
import {Student} from '../student/student.model';

@Injectable({
  providedIn: 'root'
})
export class VmsService {

  private readonly URL = 'api/courses/';

  constructor(private readonly httpClient: HttpClient) {
  }

  getVms(courseName: string, teamName: string): Observable<VirtualMachine[]> {
    const url = this.URL + courseName + '/teams/' + teamName + '/vms';
    return this.httpClient.get<VirtualMachine[]>(url);
  }

  getOwners(id: number): Observable<Student[]> {
    const url = 'vms/' + id;
    return this.httpClient.get<Student[]>(url);
  }

}
