import { NotFoundComponent } from './NotFound/NotFound.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAreaComponent } from './Areas/adminarea/admin.area/admin.area.component';
import { DashboardComponent } from './Areas/adminarea/admin.area/Components/dashboard/dashboard.component';
import { UsermanagerComponent } from './Areas/adminarea/admin.area/Components/usermanager/usermanager.component';
import { AdminGuard } from './Guards/admin.guard';
import { NotLoginGuard } from './Guards/nolog.guard';
import { UsereditComponent } from './Areas/adminarea/admin.area/Components/usermanager/useredit/useredit.component';
import { NewseditComponent } from './Areas/adminarea/admin.area/Components/dashboard/newsedit/newsedit.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent, pathMatch: 'full', canActivate: [NotLoginGuard] },
  { path: 'register', component: RegisterComponent, pathMatch: 'full', canActivate: [NotLoginGuard] },
  {
     path: 'admin-panel',
     component: AdminAreaComponent,
     canActivate: [AdminGuard],
     children: [
       {path:'', component: DashboardComponent, pathMatch:'full'},
      {path: 'user-manager', component: UsermanagerComponent, pathMatch:'full'}
      ]

    },
    {
      path: 'admin-panel',
      component: AdminAreaComponent,
      canActivate: [AdminGuard],
      children: [
        {path:'', component: DashboardComponent, pathMatch:'full'},
       {path: 'user-manager', component: UsermanagerComponent, pathMatch:'full'},
      {path:'edit-user/:id', component: UsereditComponent, pathMatch:'full'},
      {path:'edit-news/:id', component: NewseditComponent, pathMatch:'full'} 

      ]
 
     },
     
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
