import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { LoginComponent } from './components/login/login.component';
import { SendemailsComponent } from './components/sendemails/sendemails.component';
import { SubmissionComponent } from './components/submission/submission.component';
import { SurveyComponent } from './components/survey/survey.component';
import { UploadComponent } from './components/upload/upload.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'sendemails', component: SendemailsComponent },
  { path: 'survey', component: SurveyComponent },
  { path: 'submit/:surveyId', component: SubmissionComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'admin', component: AdminComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


