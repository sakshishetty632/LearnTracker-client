import { Routes } from '@angular/router';
import path from 'path';
import { ViewReportComponent } from './view-report/view-report.component';
import { AppComponent } from './app.component';
import { ReportFormComponent } from './report-form/report-form.component';

export const routes: Routes = [
    { path: '', redirectTo: '/report/new', pathMatch: 'full' }, // Redirect root to /report
    { path: 'report', component: ViewReportComponent }, // Default: Show View Report
    { path: 'report/new', component: ReportFormComponent }, // Form Page
    { path: 'report/edit/:id', component: ReportFormComponent }
];
