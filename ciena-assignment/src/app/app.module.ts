import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { AlarmsViewComponent } from './alarms-view/alarms-view.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NotificationsService } from './services/notifications.service';

@NgModule({
  declarations: [
    AppComponent,
    MainDashboardComponent,
    DashboardHeaderComponent,
    AlarmsViewComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NgbModule,
    FormsModule
  ],
  providers: [NotificationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
