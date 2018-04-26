import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/withLatestFrom';
// import { HttpClient, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Angular2TokenService } from 'angular2-token';

import { State as ListState } from './list.reducer';
import * as ListActions from './list.actions';


// import * as RecipeActions from '../store/recipe.actions';
// import { Recipe } from '../recipe.model';
// import * as fromRecipe from '../store/recipe.reducer';

@Injectable()
export class ListEffects {
  @Effect()
    
  listsFetch = this.actions$
    .ofType(ListActions.FETCH_LISTS)
    .switchMap((action: ListActions.FetchLists) => {
        debugger
        return this.tokenService.get('api/lists')
    })
    .map(
      (lists) => {
          debugger
        // console.log(recipes);
        // for (let recipe of recipes) {
        //   if (!recipe['ingredients']) {
        //     recipe['ingredients'] = [];
        //   }
        // }
        // return {
        //   type: RecipeActions.SET_RECIPES,
        //   payload: recipes
        // };
      }
    );

  constructor(private actions$: Actions,
              private tokenService: Angular2TokenService,
              private store: Store<ListState>) {}
}
