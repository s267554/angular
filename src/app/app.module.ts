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
import {FormsModule} from '@angular/forms';
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
import { StudentTabComponent } from './student/student-tab.component';
import { StudentTabContComponent } from './student/student-tab-cont.component';

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
    StudentTabContComponent
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
    MatDialogModule,
    FormsModule,
    MatListModule,
    MatTabsModule,
    MatCheckboxModule
  ],
  entryComponents: [
    VlLoginDialogComponent,
    CourseDialogContComponent
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
