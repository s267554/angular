import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './main/home.component';
import {PageNotFoundComponent} from './main/page-not-found.component';
import {AuthGuard} from './auth/auth.guard';
import {MainComponent} from './main/main.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {
    path: ':username/courses', component: MainComponent,
    // children: [
    //   {path: ':courseName/students'}
    // ],
    canActivate: [AuthGuard]
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
