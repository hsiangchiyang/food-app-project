import { Component, OnInit, Input } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';



@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  @Input() type: string;

  recipes: any;
  search_name: string = '';
  search_type: string[] = [];

  favorite_list: any = [];

  constructor(private fs: FirebaseService) { }

  ngOnInit(): void {

    if (this.type == 'own'){
      var testAppUser = localStorage.getItem('my-test-app-currentUser');
      if(testAppUser) {
        this.fs.getMyRecipes(JSON.parse(testAppUser)["uid"]).subscribe(recipes => {
          console.log(recipes);
          this.recipes = recipes;
        });
      }
    }
    if (!this.type || this.type == 'favor'){
      var testAppUser = localStorage.getItem('my-test-app-currentUser');
      if(testAppUser) {
        this.fs.getUserinfo(JSON.parse(testAppUser)["uid"]).subscribe( info =>
          {
            this.favorite_list = info["favorite"];
            console.log(info["favorite"]);
          }
        );
      }
      this.fs.getAllrecipes().subscribe( recipes => {
        this.recipes = recipes;
        // this.refreshRecipes(recipes);
      });
    }
  }

  valid_show(r){
    const regexp_name = new RegExp( this.search_name );
    if (this.type == 'favor'){
      var check = this.favorite_list;
      if (!check.includes(r.id)){
        return false;
      }
    }
    if (regexp_name.test(r.title) ){
      if(this.search_type.length == 0){
        return true;
      }
      else if( this.search_type.includes(r.type)){
        return true;
      }
    }
    return false;
  }

  Add_search_type(t){
    this.search_type.push(t);
    console.log("Search type added");
  }
  remove_search_type(t){
    const index = this.search_type.indexOf(t);
    if (index > -1) {
      this.search_type.splice(index, 1);
    }
    console.log("Search type removed");
  }

}
