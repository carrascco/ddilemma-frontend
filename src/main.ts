import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from './environment/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NgModule } from '@angular/core';


AngularFireModule.initializeApp(environment.firebase);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
