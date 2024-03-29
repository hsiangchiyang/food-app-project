import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import {FlashMessagesService} from 'angular2-flash-messages';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  recipes: Observable<any>;
  myrecipes: Observable<any>;
  recipe: Observable<any>;
  user: Observable<any>;
  user_json: any;
  user_info: Observable<any>;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth, private flashMessage: FlashMessagesService) {
    this.recipes = db.collection('recipes').valueChanges();
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        localStorage.setItem('my-test-app-currentUser', JSON.stringify(user));
        localStorage.setItem('isLoggedIn','true');
        var user_json = JSON.parse(JSON.stringify(user));
        this.user_json = user_json;
      } else {
        localStorage.setItem('my-test-app-currentUser', null);
      }
    });
    this.user = afAuth.authState;
  }

  login(){
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
      (result) => {
        localStorage.setItem('my-test-app-currentUser', JSON.stringify(result));
        localStorage.setItem('isLoggedIn','true');
        var user_json = JSON.parse(JSON.stringify(result))['user'];
        this.user_json = user_json;
        // Check for First Time User
        this.getUserinfo(user_json['uid']).subscribe( info =>
        {
          if(!info){
            let User = {
              name: user_json['displayName'],
              email: user_json['email'],
              friends: [],
              owned: [],
              favorite: []
            };
            this.db.collection("users").doc(user_json['uid']).ref.set(User);
          }
        });
      }
    ).catch( function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }
  logout(){
    this.afAuth.auth.signOut();
    localStorage.setItem('isLoggedIn','false');
    localStorage.setItem('my-test-app-currentUser', null);
    this.flashMessage.show(
      'You are logged out',
      {cssClass: 'alert-success', timeout: 3000}
    );
  }
  getUserinfo(id){
    return this.db.collection("users").doc(id).valueChanges();
  }
  UpdateUserinfo(id, user_info){
    this.db.collection('users').doc(id).set(user_info);
  }
  updateFavorites(id, favorites, Msg){
    this.db.collection('users').doc(id).update({"favorite" : favorites});
    console.log(Msg);
    this.flashMessage.show(
      Msg,
      {cssClass: 'alert-success', timeout: 2000}
    );
  }

  // Recipe Methods
  getAllrecipes(){
    this.recipes = this.db.collection('recipes').valueChanges({ idField: 'id' });
    return this.recipes;
  }
  getMyRecipes(id){
    this.myrecipes = this.db.collection('recipes',ref => ref.where('owner', '==', id)).valueChanges({ idField: 'id' });
    return this.myrecipes;
  }
  getMyFavorites(favor_list){
    console.log(favor_list);
    this.myrecipes = this.db.collection('recipes',ref => ref.where('id', 'in', favor_list)).valueChanges({ idField: 'id' });
    return this.myrecipes;
  }
  getrecipeDetails(id){
    console.log(id);
    this.recipe = this.db.collection('recipes').doc(id).valueChanges();
    return this.recipe;
  }
  addRecipe(new_recipe){
    return this.db.collection('recipes').add(new_recipe);
  }
  updateRecipe( recipe_id, new_recipe){
    return this.db.collection('recipes').doc(recipe_id).update(new_recipe);
  }
  deleteRecipe(recipe_id){
    return this.db.collection('recipes').doc(recipe_id).delete();
  }

}

// TODO: Requires updates
interface Recipe {
  title?: string;
  type?: string;
  ingredient?: string[];
  owner?: string;
  level_of_difficulty?: string;
  video_link?: string;
}
