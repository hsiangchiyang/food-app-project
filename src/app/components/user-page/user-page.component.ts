import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  myRecipes: any;

  constructor(public fs: FirebaseService) { }

  ngOnInit(): void {
    this.fs.getMyRecipes(this.fs.getUserInfo()).subscribe( recipes => {
      console.log(recipes);
      this.myRecipes = recipes;
    });

  }

}
