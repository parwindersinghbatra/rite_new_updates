import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

  bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(BrowserModule),
      provideRouter(routes)
    ]
  }).catch(err => console.error(err));