import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { AngularFireModule} from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { UsersComponent } from './users.component';
import { routing } from './app.routing';

import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form.component';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

import { AngularFireAuthModule } from 'angularfire2/auth';

import { SignupComponent } from './signup.component';
import { AuthGuard } from './auth.guard';

var config = {
  apiKey: "AIzaSyBFn-c8pyMoTxeEOKlIZpFbeaTlHW4raAY",
  authDomain: "firestore-50589.firebaseapp.com",
  databaseURL: "https://firestore-50589.firebaseio.com",
  projectId: "firestore-50589",
  storageBucket: "firestore-50589.appspot.com",
  messagingSenderId: "31750657780"
};

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,        
    UserFormComponent,
    LoginComponent, 
    SignupComponent           
  ],
  imports: [      
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    ReactiveFormsModule,     
    routing,
    AngularFireAuthModule     
  ],
  providers: [LoginService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
