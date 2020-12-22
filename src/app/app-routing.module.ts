import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';
import {VlPageNotFoundComponent} from './vl-page-not-found/vl-page-not-found.component';
import {VlHomeComponent} from './vl-home/vl-home.component';
import {VlMainComponent} from './vl-main/vl-main.component';
import {VlTabNavBarContComponent} from './vl-tab-nav-bar/vl-tab-nav-bar-cont.component';
import {StudentTabContComponent} from './student/student-tab-cont.component';
import {VmTabContComponent} from './vms/vm-tab-cont/vm-tab-cont.component';
import {TeamTabComponent} from './team/team-tab/team-tab.component';
import {TeamTableContComponent} from './team/team-table-cont/team-table-cont.component';
import {MyTeamTabComponent} from './myteam/myteam-tab/myteam-tab.component';
import {MyTeamTableContComponent} from './myteam/myteam-table-cont/myteam-table-cont.component';
import {VmsTableContComponent} from './vms/vms-table-cont/vms-table-cont.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: VlHomeComponent},
  {
    path: ':username/courses', component: VlMainComponent,
    children: [
      {
        path: ':courseName', component: VlTabNavBarContComponent,
        children: [
          {path: 'students', component: StudentTabContComponent},
          {
            path: 'groups', component: TeamTabComponent,
            children: [
              {path: '', component: TeamTableContComponent},
              {path: ':teamName/vms/:id', component: VmTabContComponent}
            ]
          },
          {
            path: 'myteams', component: MyTeamTabComponent,
            children: [
              {path: '', component: MyTeamTableContComponent}
            ]
          },
          {
            path: 'vms', component: VmsTableContComponent
          }
        ]
      },
      {path: '', component: VlHomeComponent},
      {path: '**', component: VlPageNotFoundComponent}
    ],
    canActivate: [AuthGuard]
  },
  {path: '**', component: VlPageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
