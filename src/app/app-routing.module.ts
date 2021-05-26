import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { LoginComponent } from './login/login.component';
import { SendemailsComponent } from './sendemails/sendemails.component';
import { SubmissionComponent } from './submission/submission.component';
import { SurveyComponent } from './survey/survey.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'sendemails', component: SendemailsComponent },
  { path: 'survey', component: SurveyComponent },
  { path: 'submit/:surveyId', component: SubmissionComponent },
  { path: 'upload', component: UploadComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


