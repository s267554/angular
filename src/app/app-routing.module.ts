import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';
import {VlPageNotFoundComponent} from './vl-page-not-found/vl-page-not-found.component';
import {VlHomeComponent} from './vl-home/vl-home.component';
import {VlMainComponent} from './vl-main/vl-main.component';
import {VlTabNavBarContComponent} from './vl-tab-nav-bar/vl-tab-nav-bar-cont.component';
import {StudentTabContComponent} from './student/student-tab-cont.component';
import {TeamTabContComponent} from './team/team-tab-cont.component';


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
          {path: 'groups', component: TeamTabContComponent}
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
