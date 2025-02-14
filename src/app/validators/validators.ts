import { AbstractControl, AsyncValidator, AsyncValidatorFn, EmailValidator, ValidationErrors } from "@angular/forms";
import { UsernameService } from "../services/username.service";
import { map, Observable, of, tap } from "rxjs";
import { effect, inject, signal } from "@angular/core";
export const runEffect = () => {
    let a = signal(1);
    let b = signal(2);
     effect(() => console.log(a, b ) )
} 

export class CustomeValidators {

   
 static uniqueUserName(): AsyncValidatorFn  {
    let userService = inject(UsernameService);
    return (control: AbstractControl):Promise<ValidationErrors | null> | Observable<ValidationErrors | null> =>{
        return userService.getUser(control.value).pipe(
            tap( data => console.log('dta', data)),
           map(isTaken => (isTaken ? { uniqueCompanyName: true } : null))
        );
     }
 }

 static validateEmail(): AsyncValidatorFn {
    const EMAIL_REGEXP = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return (control :AbstractControl):Promise<ValidationErrors | null> |
     Observable<ValidationErrors | null>  => {
        const valid = EMAIL_REGEXP.test(control.value);
         let data = valid ? null : { emailValidator : true}
          return of(data);
    }
 }

}