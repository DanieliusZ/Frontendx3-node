import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import {PanelService} from './services/panel.service';
import { AuthGuard } from './guards/auth.guards';
// import { FlashMessagesModule } from 'angular2-flash-messages';
import { NewPanelComponent } from './components/new-panel/new-panel.component';

const appRoutes:Routes=[
  {path:'', component:HomeComponent},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'profile', component:ProfileComponent, canActivate:[AuthGuard]},
  {path:'newpanel', component:NewPanelComponent, canActivate:[AuthGuard]},
  {path:'dashboard', component:DashboardComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    NewPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
    // FlashMessagesModule.forRoot()
  ],
  providers: [ValidateService, AuthService, PanelService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
