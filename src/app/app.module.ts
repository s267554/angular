import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {VlToolbarComponent} from './vl-toolbar/vl-toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {AuthInterceptor} from './auth/auth.interceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {VlSidenavComponent} from './vl-sidenav/vl-sidenav.component';
import {MatListModule} from '@angular/material/list';
import {VlSidenavContComponent} from './vl-sidenav/vl-sidenav-cont.component';
import {VlPageNotFoundComponent} from './vl-page-not-found/vl-page-not-found.component';
import {VlHomeComponent} from './vl-home/vl-home.component';
import {VlMainComponent} from './vl-main/vl-main.component';
import {VlLoginDialogComponent} from './vl-login-dialog/vl-login-dialog.component';
import {MatTabsModule} from '@angular/material/tabs';
import {CourseDialogComponent} from './course/course-dialog.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar} from '@angular/material/snack-bar';
import {CourseDialogContComponent} from './course/course-dialog-cont.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {StudentTableComponent} from './student/student-table.component';
import {VlTabNavBarComponent} from './vl-tab-nav-bar/vl-tab-nav-bar.component';
import {VlTabNavBarContComponent} from './vl-tab-nav-bar/vl-tab-nav-bar-cont.component';
import {StudentTabComponent} from './student/student-tab.component';
import {StudentTabContComponent} from './student/student-tab-cont.component';
import {StudentAutocompleteComponent} from './student/student-autocomplete.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {TeamTabComponent} from './team/team-tab/team-tab.component';
import {TeamTableComponent} from './team/team-table/team-table.component';
import {MyTeamTabComponent} from './myteam/myteam-tab/myteam-tab.component';
import {MyTeamTableComponent} from './myteam/myteam-table/myteam-table.component';
import {MatRippleModule} from '@angular/material/core';
import {TeamDialogComponent} from './team/team-dialog/team-dialog.component';
import {TeamDialogContComponent} from './team/team-dialog-cont/team-dialog-cont.component';
import {VmsTableComponent} from './vms/vms-table/vms-table.component';
import {VmsTableContComponent} from './vms/vms-table-cont/vms-table-cont.component';
import {ApiInterceptor} from './api/api.interceptor';
import {VmTabComponent} from './vms/vm-tab/vm-tab.component';
import {VmTabContComponent} from './vms/vm-tab-cont/vm-tab-cont.component';
import {TeamTableContComponent} from './team/team-table-cont/team-table-cont.component';
import {MyTeamTableContComponent} from './myteam/myteam-table-cont/myteam-table-cont.component';
import { ProposeDialogComponent } from './myteam/propose-dialog/propose-dialog.component';
import { ProposeDialogContComponent } from './myteam/propose-dialog-cont/propose-dialog-cont.component';
import { VmsStudTabComponent } from './vms/vms-stud-tab/vms-stud-tab.component';
import { VmDialogComponent } from './vms/vm-dialog/vm-dialog.component';
import { VmDialogContComponent } from './vms/vm-dialog-cont/vm-dialog-cont.component';
import { TeamResourcesComponent } from './vms/team-resources/team-resources.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import { AssignTabComponent } from './assign/assign-tab/assign-tab.component';
import { AssignTableComponent } from './assign/assign-table/assign-table.component';
import { AssignTableContComponent } from './assign/assign-table-cont/assign-table-cont.component';
import { PaperTableComponent } from './assign/paper-table/paper-table.component';
import {MatSelectModule} from '@angular/material/select';
import { VersionTableComponent } from './assign/version-table/version-table.component';
import { AssignDialogContComponent } from './assign/assign-dialog-cont/assign-dialog-cont.component';
import { AssignDialogComponent } from './assign/assign-dialog/assign-dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { VersionDialogContComponent } from './assign/version-dialog-cont/version-dialog-cont.component';
import { VersionDialogComponent } from './assign/version-dialog/version-dialog.component';
import { PaperDialogContComponent } from './assign/paper-dialog-cont/paper-dialog-cont.component';
import { PaperDialogComponent } from './assign/paper-dialog/paper-dialog.component';
import { FileuploadComponent } from './student/fileupload/fileupload.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { VlSignupDialogComponent } from './vl-signup-dialog/vl-signup-dialog.component';
import { VlProfileDialogComponent } from './vl-profile-dialog/vl-profile-dialog.component';
import { VmsTabComponent } from './vms/vms-tab/vms-tab.component';

@NgModule({
  declarations: [
    AppComponent,
    VlToolbarComponent,
    VlSidenavComponent,
    VlSidenavContComponent,
    VlPageNotFoundComponent,
    VlHomeComponent,
    VlMainComponent,
    VlLoginDialogComponent,
    CourseDialogComponent,
    CourseDialogContComponent,
    StudentTableComponent,
    VlTabNavBarComponent,
    VlTabNavBarContComponent,
    StudentTabComponent,
    StudentTabContComponent,
    StudentAutocompleteComponent,
    TeamTabComponent,
    TeamTableComponent,
    TeamDialogComponent,
    TeamDialogContComponent,
    MyTeamTabComponent,
    MyTeamTableComponent,
    VmsTableComponent,
    VmsTableContComponent,
    VmTabComponent,
    VmTabContComponent,
    TeamTableContComponent,
    MyTeamTableContComponent,
    ProposeDialogComponent,
    ProposeDialogContComponent,
    VmsStudTabComponent,
    VmDialogComponent,
    VmDialogContComponent,
    TeamResourcesComponent,
    AssignTabComponent,
    AssignTableComponent,
    AssignTableContComponent,
    PaperTableComponent,
    VersionTableComponent,
    AssignDialogContComponent,
    AssignDialogComponent,
    VersionDialogContComponent,
    VersionDialogComponent,
    PaperDialogContComponent,
    PaperDialogComponent,
    FileuploadComponent,
    VlSignupDialogComponent,
    VlProfileDialogComponent,
    VmsTabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatListModule,
    MatTabsModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatRippleModule,
    MatProgressBarModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    VlLoginDialogComponent,
    CourseDialogContComponent,
    TeamDialogContComponent
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: false
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2500
      }
    },
    MatSnackBar
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
