import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
// import { HttpModule } from '@angular/http';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { CaseComponent } from './case/case.component';
import { CallbackComponent } from './callback/callback.component';

import { SalesforceOauthInterceptor } from './authservice.service';

@NgModule({
  declarations: [
    AppComponent,
    CaseComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    // FormsModule,
    HttpClientModule,
    // HttpModule,
    RouterModule.forRoot([{
        path: 'callback',
        component: CallbackComponent
      }, {
        path: 'case',
        component: CaseComponent
      }
    ])
  ],
  exports: [],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: SalesforceOauthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }



