import { Routes } from '@angular/router';
import { LoginComponent } from './userAuth/login/login.component';
import { SignupComponent } from './userAuth/signup/signup.component';
import { VarifyComponent } from './userAuth/varify/varify.component';
import { ForgetComponent } from './userAuth/forget/forget.component';
import { DashboardComponent } from './web/dashboard/dashboard.component';
import { BlogComponent } from './web/blog/blog.component';
import { ProjectComponent } from './web/project/project.component';
import { BlogDetailsComponent } from './web/blog-details/blog-details.component';
import { UserListComponent } from './adminPanel/user-list/user-list.component';
import { ProjectDetailsComponent } from './web/project-details/project-details.component';
import { EventsComponent } from './web/events/events.component';
import { EventDetailsComponent } from './web/event-details/event-details.component';
import { DonateComponent } from './web/donate/donate.component';
import { DonateDetailsComponent } from './web/donate-details/donate-details.component';
import { TeamComponent } from './web/team/team.component';

export const routes: Routes = [

    { path:'', redirectTo: 'dashboard', pathMatch: 'full' },
    {path:'login', component:LoginComponent},
    {path:'signup', component:SignupComponent},
    {path:'verify', component:VarifyComponent},
    {path:'forget', component:ForgetComponent},

    {path:'dashboard', component:DashboardComponent},
    
    {path:'blog', component:BlogComponent},
    {path:'BlogDetails', component:BlogDetailsComponent},
    
    {path:'project', component:ProjectComponent},
    {path:'projectDetails', component:ProjectDetailsComponent},

    {path:'event', component:EventsComponent},
    {path:'eventDetails', component:EventDetailsComponent},

    {path:'donate', component:DonateComponent},
    {path:'donateDetails',component:DonateDetailsComponent},

    {path:'UserList', component:UserListComponent},

    {path:'team_manager', component:TeamComponent}


];
