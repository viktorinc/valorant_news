import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import {UserAreaComponent} from './Areas/userarea/user.area/user.area.component'

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './NotFound/NotFound.component';
import { AppRoutingModule } from './app-routing.module';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminAreaComponent } from './Areas/adminarea/admin.area/admin.area.component';
import { UsermanagerComponent } from './Areas/adminarea/admin.area/Components/usermanager/usermanager.component';
import { DashboardComponent } from './Areas/adminarea/admin.area/Components/dashboard/dashboard.component';
import { NewsComponent } from './news/news.component';
import { NgZorroAntdModule, NZ_I18N, uk_UA } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import uk from '@angular/common/locales/uk';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { UsereditComponent } from './Areas/adminarea/admin.area/Components/usermanager/useredit/useredit.component';
import { NewseditComponent } from './Areas/adminarea/admin.area/Components/dashboard/newsedit/newsedit.component';

registerLocaleData(uk);

const notifierOptions: NotifierOptions = {
  position: {horizontal: { position: 'right' }, vertical: { position: 'top' }}
};

@NgModule({
   declarations: [
      AppComponent,
      NavMenuComponent,
      HomeComponent,
      LoginComponent,
      RegisterComponent,
      RegisterComponent,
      NotFoundComponent,
      UsereditComponent,
      AdminAreaComponent,
      UserAreaComponent,
      NewseditComponent,
      UsermanagerComponent,
      DashboardComponent,
      NewsComponent
   ],
   imports: [
      BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
      HttpClientModule,
      FormsModule,
      AppRoutingModule,
      NotifierModule.withConfig(notifierOptions),
      BrowserAnimationsModule,
      NgxSpinnerModule,
      DemoNgZorroAntdModule
   ],
   providers: [{ provide: NZ_I18N, useValue: uk_UA }],


  bootstrap: [AppComponent]
})

export class AppModule { }
