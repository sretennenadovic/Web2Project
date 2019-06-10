import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { UnauthorizedUserComponent } from "./components/unauthorized-user/unauthorized-user.component";
import { UnauthorizedHeaderComponent } from "./components/unauthorized-header/unauthorized-header.component";
import { UnauthorizedNavBarComponent } from "./components/unauthorized-nav-bar/unauthorized-nav-bar.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptor } from "./interceptors/token.interceptor";
import { AuthService } from "./services/auth.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ScheduleComponent } from "./components/schedule/schedule.component";
import { LinesComponent } from "./components/lines/lines.component";
import { VehicleLocationsComponent } from "./components/vehicle-locations/vehicle-locations.component";
import { CatalogComponent } from "./components/catalog/catalog.component";
import { BaseHttpService } from "./services/http/base-http.service";
import { ScheduleHttpService, ScheduleLineHttpService } from "./services/schedule/schedule.service";
import { CatalogHttpService } from './services/catalog/catalog.service';
import { AdminComponent } from './components/admin/admin.component';
import { AdminNavBarComponent } from './components/admin-nav-bar/admin-nav-bar.component';
import { AuthorizedUserHeaderComponent } from './components/authorized-user-header/authorized-user-header.component';
import { AuthGuard } from './auth/auth.guard';
import { UnauthorizedBuyTicketComponent } from './components/unauthorized-buy-ticket/unauthorized-buy-ticket.component';
import { TicketPostService } from './services/ticket/ticket.service';
import { AdminScheduleComponent } from './components/admin-schedule/admin-schedule.component';
import { AdminAddScheduleComponent } from './components/admin-add-schedule/admin-add-schedule.component';
import { AdminChangeScheduleComponent } from './components/admin-change-schedule/admin-change-schedule.component';
import { AdminDeleteScheduleComponent } from './components/admin-delete-schedule/admin-delete-schedule.component';
import { AdminCatalogComponent } from './components/admin-catalog/admin-catalog.component';
import { AdminAddCatalogComponent } from './components/admin-add-catalog/admin-add-catalog.component';
import { AdminCatalogViewComponent } from './components/admin-catalog-view/admin-catalog-view.component';
import { ControlorComponent } from './components/controlor/controlor.component';
import { PassengerComponent } from './components/passenger/passenger.component';
import { AuthGuardContorllor } from './auth/authControllor.guard';
import { AuthGuardPassenger } from './auth/authPassenger.guard';
import { AdminStationsComponent } from './components/admin-stations/admin-stations.component';

import { AgmCoreModule } from '@agm/core';
import { StationHttpService } from './services/station/station.service';
import { ChangeStationComponent } from './components/change-station/change-station.component';
import { DeleteStationComponent } from './components/delete-station/delete-station.component';
import { LineHttpService } from './services/lines/line.service';
import { AddLineComponent } from './components/add-line/add-line.component';
import { LineTypeHttpService } from './services/linetypes/linetypes.service';
import { ChangeLineComponent } from './components/change-line/change-line.component';
import { DeleteLineComponent } from './components/delete-line/delete-line.component';
import { ControlorNavBarComponent } from './components/controlor-nav-bar/controlor-nav-bar.component';
import { ControllorValidationComponent } from './components/controllor-validation/controllor-validation.component';
import { AddControllerComponent } from './components/add-controller/add-controller.component';
import { PassengerNavBarComponent } from './components/passenger-nav-bar/passenger-nav-bar.component';


const childrenUnauthorizedRoutes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "schedule", component: ScheduleComponent },
  { path: "lines", component: LinesComponent },
  { path: "vehicleLocations", component: VehicleLocationsComponent },
  { path: "catalog", component: CatalogComponent },
  { path: "buyOneTimeTicket", component: UnauthorizedBuyTicketComponent }
];

const childrenAdminRoutes: Routes = [
  {path: "", redirectTo: "/admin/adminSchedule", pathMatch: "full"},
  {path: "adminSchedule", component: AdminScheduleComponent},
  {path: "adminAddSchedule", component: AdminAddScheduleComponent},
  {path: "adminChangeSchedule", component: AdminChangeScheduleComponent},
  {path: "adminDeleteSchedule", component: AdminDeleteScheduleComponent},
  {path: "adminCatalog", component: AdminCatalogComponent},
  {path: "adminCatalogView/:id", component: AdminCatalogViewComponent},
  {path: "adminAddCatalog", component: AdminAddCatalogComponent},
  {path: "stations", component: AdminStationsComponent},
  {path: "changeStation", component: ChangeStationComponent},
  {path: "deleteStation", component: DeleteStationComponent},
  {path: "lines", component: LinesComponent},
  {path: "addLine", component: AddLineComponent},
  {path: "changeLine", component: ChangeLineComponent},
  {path: "deleteLine", component: DeleteLineComponent},
  {path: "addContr", component: AddControllerComponent}
];

const childrenControlorRoutes: Routes = [
  {path: "", redirectTo: "/controllor/validation", pathMatch: "full"},
  {path: "validation", component: ControllorValidationComponent}
];

const childrenPassengerRoutes: Routes = [
  {path: "", redirectTo: "/passenger/schedule", pathMatch: "full"},
  { path: "schedule", component: ScheduleComponent },
  { path: "lines", component: LinesComponent },
  { path: "vehicleLocations", component: VehicleLocationsComponent },
  { path: "catalog", component: CatalogComponent }
];

const routes: Routes = [
  {
    path: "unauthorizedUser",
    component: UnauthorizedUserComponent,
    children: childrenUnauthorizedRoutes
  },
  { path: "", redirectTo: "/unauthorizedUser/login", pathMatch: "full" },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: childrenAdminRoutes
  },
  {
    path: "controllor",
    component: ControlorComponent,
    canActivate: [AuthGuardContorllor],
    children: childrenControlorRoutes
  },
  {
    path: "passenger",
    component: PassengerComponent,
    canActivate: [AuthGuardPassenger],
    children: childrenPassengerRoutes
  }
];

@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedUserComponent,
    UnauthorizedHeaderComponent,
    UnauthorizedNavBarComponent,
    LoginComponent,
    RegisterComponent,
    ScheduleComponent,
    LinesComponent,
    VehicleLocationsComponent,
    CatalogComponent,
    AdminComponent,
    AdminNavBarComponent,
    AuthorizedUserHeaderComponent,
    UnauthorizedBuyTicketComponent,
    AdminScheduleComponent,
    AdminAddScheduleComponent,
    AdminChangeScheduleComponent,
    AdminDeleteScheduleComponent,
    AdminCatalogComponent,
    AdminAddCatalogComponent,
    AdminCatalogViewComponent,
    ControlorComponent,
    PassengerComponent,
    AdminStationsComponent,
    ChangeStationComponent,
    DeleteStationComponent,
    AddLineComponent,
    ChangeLineComponent,
    DeleteLineComponent,
    ControlorNavBarComponent,
    ControllorValidationComponent,
    AddControllerComponent,
    PassengerNavBarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDnihJyw_34z5S1KZXp90pfTGAqhFszNJk'})
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    AuthService,
    BaseHttpService,
    ScheduleHttpService,
    CatalogHttpService,
    ScheduleLineHttpService,
    TicketPostService,
    StationHttpService,
    LineHttpService,
    LineTypeHttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
