import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: any;

  constructor(private fs: FirebaseService) { }

  ngOnInit(): void {
    this.fs.getAllrecipes().subscribe( recipes => {
      console.log(recipes);
      this.recipes = recipes;
    });
  }

}
