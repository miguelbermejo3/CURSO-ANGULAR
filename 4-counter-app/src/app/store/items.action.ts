import { createAction, props } from "@ngrx/store";



export const increment = createAction('[Counter Component] Increment' ,props<{add:number}>()); //donde y lo que hace, ambos a elegir lo que queramos mas descriptivo
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');