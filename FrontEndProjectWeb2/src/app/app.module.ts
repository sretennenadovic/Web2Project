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

const childrenUnauthorizedRoutes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "schedule", component: ScheduleComponent },
  { path: "lines", component: LinesComponent },
  { path: "vehicleLocations", component: VehicleLocationsComponent },
  { path: "catalog", component: CatalogComponent }
];

const childrenAdminRoutes: Routes = [
];

const routes: Routes = [
  {
    path: "unauthorizedUser",
    component: UnauthorizedUserComponent,
    children: childrenUnauthorizedRoutes
  },
  { path: "", redirectTo: "/unauthorizedUser", pathMatch: "full" },
  {
    path: "admin",
    component: AdminComponent,
    children: childrenAdminRoutes
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
    AuthorizedUserHeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    AuthService,
    BaseHttpService,
    ScheduleHttpService,
    CatalogHttpService,
    ScheduleLineHttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
