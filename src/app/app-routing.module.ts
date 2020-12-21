import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ListingsComponent} from './components/listings/listings.component';
import {AddListingComponent} from './components/add-listing/add-listing.component';
import {ListingComponent} from './components/listing/listing.component';
import {EditListingComponent} from './components/edit-listing/edit-listing.component';
import {RecipesComponent} from './components/recipes/recipes.component';
import {RecipeComponent} from './components/recipe/recipe.component';
import {AddRecipeComponent} from './components/add-recipe/add-recipe.component';
import {EditRecipeComponent} from './components/edit-recipe/edit-recipe.component';
import {UserPageComponent} from './components/user-page/user-page.component';


const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'listings', component: ListingsComponent},
  {path: 'listing/:id', component: ListingComponent},
  {path: 'add-listing', component: AddListingComponent},
  {path: 'edit-listing/:id', component: EditListingComponent},
  {path: 'recipes', component: RecipesComponent},
  {path: 'recipe/:id', component: RecipeComponent},
  {path: 'add-recipe', component: AddRecipeComponent},
  {path: 'edit-recipe/:id', component: EditRecipeComponent},
  {path: 'my-page', component: UserPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
