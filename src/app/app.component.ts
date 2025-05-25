import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 's-portfolio';
  
firebaseConfig = {
  apiKey: "AIzaSyAVOZqGl7GC1Xl8CW1TG-GaytD8WvJp_is",
  authDomain: "sunil-portfolio-4543b.firebaseapp.com",
  projectId: "sunil-portfolio-4543b",
  storageBucket: "sunil-portfolio-4543b.firebasestorage.app",
  messagingSenderId: "936422405208",
  appId: "1:936422405208:web:82a861f5e93deb4307862d",
  measurementId: "G-0WT7C0R9HH"
};
 initializeApp(firebaseConfig: FirebaseOptions): FirebaseApp {
    return initializeApp(firebaseConfig);
  }
}
