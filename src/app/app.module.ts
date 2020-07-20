import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {VlToolbarComponent} from './vl-toolbar/vl-toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from './auth/auth.service';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {AuthInterceptor} from './auth/auth.interceptor';
import {FormsModule} from '@angular/forms';
import {AuthGuard} from './auth/auth.guard';
import {VlSidenavComponent} from './vl-sidenav/vl-sidenav.component';
import {MatListModule} from '@angular/material/list';
import {VlService} from './service/vl.service';
import {VlSidenavContComponent} from './vl-sidenav/vl-sidenav-cont.component';
import {VlPageNotFoundComponent} from './vl-page-not-found/vl-page-not-found.component';
import {VlHomeComponent} from './vl-home/vl-home.component';
import {VlMainComponent} from './vl-main/vl-main.component';
import {VlLoginDialogComponent} from './vl-login-dialog/vl-login-dialog.component';
import { VlSidenavContentComponent } from './vl-sidenav-content/vl-sidenav-content.component';
import {MatTabsModule} from '@angular/material/tabs';
import {CourseService} from './service/course.service';

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
    VlSidenavContentComponent
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
    MatTabsModule
  ],
  entryComponents: [
    VlLoginDialogComponent
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
    AuthGuard,
    AuthService,
    VlService,
    CourseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
