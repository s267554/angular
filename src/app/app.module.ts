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
import {HomeComponent} from './main/home.component';
import {PageNotFoundComponent} from './main/page-not-found.component';
import {MainComponent} from './main/main.component';
import {LoginDialogComponent} from './login/login-dialog.component';
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

@NgModule({
  declarations: [
    AppComponent,
    VlToolbarComponent,
    HomeComponent,
    PageNotFoundComponent,
    MainComponent,
    LoginDialogComponent,
    VlSidenavComponent,
    VlSidenavContComponent
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
    MatListModule
  ],
  entryComponents: [
    LoginDialogComponent
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
    VlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
