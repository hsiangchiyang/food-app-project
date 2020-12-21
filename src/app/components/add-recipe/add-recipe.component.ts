import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  title: any;
  type: any;
  time: any;
  ingredient: any;
  owner: any;
  level_of_difficulty: any;
  video_link: any;

  constructor(private fs: FirebaseService, private router: Router) { }

  ngOnInit(): void {
    this.owner = this.fs.uid;
  }

  onAddsubmit(){
    let recipe = {
      title: this.title,
      ingredient: this.ingredient,
      owner: this.owner,
      type: this.type,
      time: this.time,
      level_of_difficulty: this.level_of_difficulty,
      video_link: this.video_link
    };
    this.fs.addRecipe(recipe);
    this.router.navigate(['recipes']);
  }

}