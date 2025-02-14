import { Injectable } from '@angular/core';
import { delay, Observable, of, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  constructor() { }
  private existingUsernames = ['Batman', 'Superman', 'Joker', 'Luthor'];

  usernameExist(value: string) {
    console.log(value);
      return of(this.existingUsernames.some((a) => a === value)).pipe(
        delay(1000)
      );
  }

  getUser(value: string){
     return timer(6000).pipe(
      switchMap( () => this.usernameExist(value))
     )
  }
}
