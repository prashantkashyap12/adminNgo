import { Routes } from '@angular/router';
import { LoginComponent } from './userAuth/login/login.component';
import { SignupComponent } from './userAuth/signup/signup.component';
import { VarifyComponent } from './userAuth/varify/varify.component';
import { ForgetComponent } from './userAuth/forget/forget.component';
import { DashboardComponent } from './web/dashboard/dashboard.component';
import { BlogComponent } from './web/blog/blog.component';
import { ProjectComponent } from './web/project/project.component';

export const routes: Routes = [

    { path:'', redirectTo: 'dashboard', pathMatch: 'full' },
    {path:'login', component:LoginComponent},
    {path:'signup', component:SignupComponent},
    {path:'verify', component:VarifyComponent},
    {path:'forget', component:ForgetComponent},

    {path:'dashboard', component:DashboardComponent},
    {path:'blog', component:BlogComponent},
    {path:'project', component:ProjectComponent},



];
