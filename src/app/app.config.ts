import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environment/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [ provideClientHydration(), importProvidersFrom([
    provideFirebaseApp(()=> initializeApp(environment.firebase)),
    provideFirestore(()=> getFirestore())
  ])]
};
