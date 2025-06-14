import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes'; // Import routes
import { provideHttpClient, withFetch } from '@angular/common/http'; // Import HttpClient with fetch support


import { environment } from './environments/environment'; // ✅ დაამატე ეს

console.log('🟡 CURRENT ENVIRONMENT CONFIG:', environment); // ✅ ეს დაბეჭდავს { production: ..., apiUrl: ... }


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes), 
    provideHttpClient(withFetch()), // Use the modern fetch API for HttpClient
  ],
}).catch((err) => console.error(err));
