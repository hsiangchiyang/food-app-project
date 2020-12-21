import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  id: any;
  title: any;
  type: any;
  time: any;
  ingredient: any;
  owner: any;
  level_of_difficulty: any;
  video_link: any;

  constructor(private fs: FirebaseService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.fs.getrecipeDetails(this.id).subscribe(recipe => {
      this.title = recipe.title;
      this.type = recipe.type;
      this.time = recipe.time;
      this.ingredient = recipe.ingredient;
      this.owner = recipe.owner;
      this.level_of_difficulty = recipe.level_of_difficulty;
      this.video_link = recipe.video_link;
    });
  }

  onEditsubmit(){
    let recipe = {
      title: this.title,
      type: this.type,
      time: this.time,
      ingredient: this.ingredient,
      owner: this.owner,
      level_of_difficulty: this.level_of_difficulty,
      video_link: this.video_link
    };
    this.fs.updateRecipe(this.id, recipe);
    this.router.navigate(['/recipes']);
  }
}
