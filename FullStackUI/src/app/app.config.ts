import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { SpeechToTextModule } from './components/speech-to-text/speech-to-text/speech-to-text.module';
import { NgxPaginationModule } from 'ngx-pagination';
//import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(), importProvidersFrom(FormsModule, BrowserModule, CommonModule, BrowserAnimationsModule, MatIconModule, NgxPaginationModule, SpeechToTextModule, RouterModule.forRoot(routes))]
 
};
