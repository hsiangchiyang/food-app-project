import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import {FlashMessagesService} from 'angular2-flash-messages';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  listings: Observable<any>;
  listing: Observable<any>;

  recipes: Observable<any>;
  myrecipes: Observable<any>;
  recipe: Observable<any>;
  user: Observable<any>;
  uid: any;
  user_email: any;
  user_photoURL: any;
  user_name: any;
  folder: any;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth, private flashMessage: FlashMessagesService) {
    // this.listings = db.collection('listings').valueChanges();
    this.recipes = db.collection('recipes').valueChanges();
    this.myrecipes = this.getMyRecipes('');

    this.user = afAuth.authState;
    var user = firebase.auth().currentUser;
    if (user != null) {
      // console.log("asasd");
      // console.log(" Sign-in provider: " + user.providerId);
      // console.log("  Provider-specific UID: " + user.uid);
      // console.log("  Provider-specific UID: " + user.uid);
      // console.log("  Name: " + user.displayName);
      // console.log("  Email: " + user.email);
      // console.log("  Photo URL: " + user.photoURL);
      this.uid = user.uid;
      this.user_email = user.email;
      this.user_photoURL = user.photoURL;
      this.user_name = user.displayName;
      this.myrecipes = this.getMyRecipes(user.uid);
    }
  }
  login(){
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.getUserInfo();
  }
  logout(){
    this.afAuth.auth.signOut();
    this.flashMessage.show(
      'You are logged out',
      {cssClass: 'alert-success', timeout: 3000}
    );
  }
  getUserInfo(){
    this.user.subscribe(res => { if (res && res.uid){
      this.uid = res.uid;
    } }
    );
    var user = firebase.auth().currentUser;
    if (user != null) {
        // console.log("asasd");
        // console.log(" Sign-in provider: " + user.providerId);
        // console.log("  Provider-specific UID: " + user.uid);
        // console.log("  Provider-specific UID: " + user.uid);
        // console.log("  Name: " + user.displayName);
        // console.log("  Email: " + user.email);
        // console.log("  Photo URL: " + user.photoURL);
        this.uid = user.uid;
        this.user_email = user.email;
        this.user_photoURL = user.photoURL;
        this.user_name = user.displayName;
    }

    return this.uid;
  }

  // Listing Reference
  getAlllistings(){
    this.listings = this.db.collection('listings').valueChanges({ idField: 'id' });
    return this.listings;
  }
  getListingDetails(id){
    // this.listing = this.db.collection('listings',ref => ref.where('$key', '==', id)).valueChanges();
    console.log(id);
    this.listing = this.db.collection('listings/').doc(id).valueChanges();
    return this.listing;
  }
  addListing(new_listing){
    var storage = firebase.storage();
    var storageRef = storage.ref();
    for (let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then( (snapshot) => {
        new_listing.image = selectedFile.name;
        new_listing.path = path;
        return this.db.collection('listings').add(new_listing);
      });
    }
  }
  updateListing( listing_id, new_listing){
    return this.db.collection('listings').doc(listing_id).update(new_listing);
  }
  deleteListing( listing_id){
    return this.db.collection('listings').doc(listing_id).delete();
  }

  // Recipe Reference
  getAllrecipes(){
    this.recipes = this.db.collection('recipes').valueChanges({ idField: 'id' });
    return this.recipes;
  }

  getMyRecipes(id){
    this.myrecipes = this.db.collection('recipes',ref => ref.where('owner', '==', id)).valueChanges({ idField: 'id' });
    return this.myrecipes;
  }
  getrecipeDetails(id){
    // this.listing = this.db.collection('listings',ref => ref.where('$key', '==', id)).valueChanges();
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
  deleteRecipe( recipe_id){
    return this.db.collection('recipes').doc(recipe_id).delete();
  }
}

interface Recipe {
  title?: string;
  type?: string;
  ingredient?: string[];
  owner?: string;
  level_of_difficulty?: string;
  video_link?: string;
}

interface Listing {
  $key?: string;
  title?: string;
  type?: string;
  image?: string;
  city?: string;
  owner?: string;
  bedrooms?: string;
}
