import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {RecipesComponent} from './components/recipes/recipes.component';
import {RecipeComponent} from './components/recipe/recipe.component';
import {AddRecipeComponent} from './components/add-recipe/add-recipe.component';
import {EditRecipeComponent} from './components/edit-recipe/edit-recipe.component';
import {UserPageComponent} from './components/user-page/user-page.component';
import {AuthGuard} from './guards/auth.guard';


const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'recipes', component: RecipesComponent, canActivate : [AuthGuard]},
  {path: 'recipe/:id', component: RecipeComponent, canActivate : [AuthGuard]},
  {path: 'add-recipe', component: AddRecipeComponent, canActivate : [AuthGuard]},
  {path: 'edit-recipe/:id', component: EditRecipeComponent, canActivate : [AuthGuard]},
  {path: 'my-page', component: UserPageComponent, canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
