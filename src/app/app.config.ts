import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-4c5f7","appId":"1:412888545149:web:390e290c542a8735c8be14","storageBucket":"simple-crm-4c5f7.firebasestorage.app","apiKey":"AIzaSyBSy4KkaeHQX4Co8q_7SprKCBVCyyKNPqw","authDomain":"simple-crm-4c5f7.firebaseapp.com","messagingSenderId":"412888545149"}))), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideDatabase(() => getDatabase()))]
};
