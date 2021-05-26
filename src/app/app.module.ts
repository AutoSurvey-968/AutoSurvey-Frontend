import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SurveyComponent } from './survey/survey.component';
import { LoginComponent } from './login/login.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { SubmissionComponent } from './submission/submission.component';
import { UploadComponent } from './upload/upload.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SendemailsComponent } from './sendemails/sendemails.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    LoginComponent,
    AnalyticsComponent,
    SubmissionComponent,
    UploadComponent,
    NavbarComponent,
    SendemailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
