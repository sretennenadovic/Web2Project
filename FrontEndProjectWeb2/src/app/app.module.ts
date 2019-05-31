import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component';
import { UnauthorizedUserComponent } from './components/unauthorized-user/unauthorized-user.component';
import { UnauthorizedHeaderComponent } from './components/unauthorized-header/unauthorized-header.component';
import { UnauthorizedNavBarComponent } from './components/unauthorized-nav-bar/unauthorized-nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const childrenRoutes : Routes = [
  {path:'login',component: LoginComponent},
  {path:'register',component: RegisterComponent}
]

const routes : Routes = [
  {path:'unauthorizedUser', component: UnauthorizedUserComponent, children:childrenRoutes},
  {path:'', redirectTo:'/unauthorizedUser', pathMatch:'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedUserComponent,
    UnauthorizedHeaderComponent,
    UnauthorizedNavBarComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi : true}, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
