import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FirebaseService} from './services/firebase.service';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import {FlashMessagesModule, FlashMessagesService} from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';
import {YouTubePlayerModule} from '@angular/youtube-player';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserPageComponent } from './components/user-page/user-page.component';
import { AuthGuard} from './guards/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RecipesComponent,
    RecipeComponent,
    AddRecipeComponent,
    EditRecipeComponent,
    UserPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireAnalyticsModule,
    FlashMessagesModule,
    FormsModule,
    NgbModule,
    YouTubePlayerModule,
    HttpClientModule
  ],
  providers: [FirebaseService, FlashMessagesService,  AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
