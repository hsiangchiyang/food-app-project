import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  myRecipes: any;
  user_photoURL: any;
  user_name: any;
  user_email: any;

  constructor(public fs: FirebaseService) { }

  ngOnInit(): void {

    var testAppUser = localStorage.getItem('my-test-app-currentUser');
    if(testAppUser){
      this.user_photoURL= JSON.parse(testAppUser)["photoURL"];
      this.user_name = JSON.parse(testAppUser)["displayName"];
      this.user_email = JSON.parse(testAppUser)["email"];
      this.fs.getMyRecipes(JSON.parse(testAppUser)["uid"]).subscribe( recipes => {
        console.log(recipes);
        this.myRecipes = recipes;
      });
    }
  }

}
