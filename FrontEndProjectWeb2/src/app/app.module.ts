import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component';
import { UnauthorizedUserComponent } from './unauthorized-user/unauthorized-user.component';
import { UnauthorizedHeaderComponent } from './unauthorized-header/unauthorized-header.component';
import { UnauthorizedNavBarComponent } from './unauthorized-nav-bar/unauthorized-nav-bar.component';

const routes : Routes = [
  {path:"unauthoizedUser",
    component: UnauthorizedUserComponent,
    children:[
      {path:"login",component: UnauthorizedHeaderComponent}
    ]
  },
  {path:'', redirectTo:'/unauthoizedUser', pathMatch:'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedUserComponent,
    UnauthorizedHeaderComponent,
    UnauthorizedNavBarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
