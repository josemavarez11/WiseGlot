import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withViewTransitions } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withViewTransitions()), provideFirebaseApp(() => initializeApp({"projectId":"wiseglot-bfbe0","appId":"1:630583664282:web:31f2c84781998adfc20923","storageBucket":"wiseglot-bfbe0.appspot.com","apiKey":"AIzaSyDWTz3TcT0j8gWbO446KFEPHxM8NewywYY","authDomain":"wiseglot-bfbe0.firebaseapp.com","messagingSenderId":"630583664282","measurementId":"G-M3JBTRNG8W"})), provideStorage(() => getStorage()),
  ],
});

// "locationId":"us-central",
