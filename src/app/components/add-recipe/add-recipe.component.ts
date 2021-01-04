import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  title: string = '';
  type: any;
  time: string = '';
  ingredient: string = '';
  owner: any;
  level_of_difficulty: any;
  video_link: string = '';
  name: any;
  instructions: string = '';
  has_link : boolean = false;

  constructor(private fs: FirebaseService, private router: Router) { }

  ngOnInit(): void {
    var testAppUser = localStorage.getItem('my-test-app-currentUser');
    if(testAppUser){
      this.owner = JSON.parse(testAppUser)["uid"];
      this.name = JSON.parse(testAppUser)["displayName"];
    }
  }

  onAddsubmit(){
    //TODO: add new recipe interface
    let recipe = {
      title: this.title,
      ingredient: this.ingredient,
      owner: this.owner,
      owner_name: this.name,
      type: this.type,
      time: this.time,
      level_of_difficulty: this.level_of_difficulty,
      video_link: this.video_link,
      instructions: this.instructions,
    };
    this.fs.addRecipe(recipe);
    this.router.navigate(['recipes']);
  }

}
