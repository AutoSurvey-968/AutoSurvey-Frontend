import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AppComponent } from './app.component';
import { SurveyComponent } from './components/survey/survey.component';
import { LoginComponent } from './components/login/login.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { SubmissionComponent } from './components/submission/submission.component';
import { UploadComponent } from './components/upload/upload.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SendemailsComponent } from './components/sendemails/sendemails.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkWeekSelectionStrategyDirective } from './directives/work-week-selection/work-week-selection-strategy.directive';
import { AdminComponent } from './components/admin/admin.component'
import {NgbModule, NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BarChartsComponent } from './components/analytics/charts/barcharts.component';
import { PiechartsComponent } from './components/analytics/charts/piecharts.component';
import { MatInputModule } from '@angular/material/input';
import { RadioQuestionComponent } from './components/submission/questions/question-radio.component';
import { MultipleChoiceQuestionComponent } from './components/submission/questions/question-multiple-choice.component';
import { ShortAnswerQuestionComponent } from './components/submission/questions/question-short-answer.component';
import { DropdownQuestionComponent } from './components/submission/questions/question-dropdown.component';


@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    LoginComponent,
    AnalyticsComponent,
    SubmissionComponent,
    UploadComponent,
    NavbarComponent,
    SendemailsComponent,
    WorkWeekSelectionStrategyDirective,
    AdminComponent,
    BarChartsComponent,
    PiechartsComponent,
    RadioQuestionComponent,
    MultipleChoiceQuestionComponent,
    ShortAnswerQuestionComponent,
    DropdownQuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule,
    NgApexchartsModule,
    MatSnackBarModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
