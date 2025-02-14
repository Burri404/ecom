import { Component, computed, effect, inject, OnInit, signal, ɵprovideZonelessChangeDetection } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { MainNavComponent } from './main-nav/main-nav.component';
import { CategoryService } from './services/category.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { getCategoriesActions } from './store/category/category.action';
import { selectCategories } from './store/category/category.selector';
import { CategoryState } from './store/category/category.reducer';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './shared/input/input.component';
import { CustomeValidators, runEffect } from '../app/validators/validators';
import { ToupperCaseDirective } from './directives/touppercase';
type Status = 'loading' | 'loaded' | 'error'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToupperCaseDirective, MatIconModule, MainNavComponent, CommonModule, ReactiveFormsModule,
    InputComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ecom';
  loginForm!: FormGroup;
  cheked: boolean = false;
  count = signal(1);
  Status: any;
  isActive: boolean = false;
  //categories$ =  this.store.select(selectCategories);
  //categories$ = inject(CategoryService).getCategories();
  constructor(private readonly categorySerice:CategoryService, private store: Store<CategoryState>,
    private formbuilder: FormBuilder

  ){  
      this.userloginForm();
      //runEffect();
      const a = signal(1);
      const b = signal(2);
      effect(() => {
       
        console.log('The count is:',a(), b());
      });
      setTimeout( () => a.set(2), 1000);
      setTimeout( () => b.set(3), 1000);
      console.log(this.statusResult('loaded'));
    }
  

  userloginForm() : void {
    this.loginForm = this.formbuilder.group({
      username: ['',  Validators.compose([Validators.required,Validators.minLength(4), Validators.maxLength(8)
         ]), CustomeValidators.uniqueUserName(),     
        ],
      password: ['', Validators.required],
      email: ['', Validators.required, CustomeValidators.validateEmail()],
      terms: [false, Validators.requiredTrue]
    });
  }
  ngOnInit() {
    for(let i =0 ;i < 5; i++){
        var btn = document.createElement('button'); 
         btn.appendChild(document.createTextNode('Buttion '+ i));
         btn.addEventListener('click', ()=> {
          console.log(i);
         });
         document.body.appendChild(btn);
    }
    
  
    this.count.update ( ( value) => value +1);
   
    console.log('count update after', this.count());
    let flag = true;
    let doublecount = computed(() => {
      if (flag) {
        return `The count is ${this.count() *2}.`;
      } else {
        return 'Nothing to see here!';
      }
    });
   // let doublecount =  computed( () => this.count() * 2);
    console.log('count update after1', this.count());
    this.count.update ( ( value) => value +1);
    console.log('count update after2', this.count());
    console.log('double count', doublecount());
    console.log('double count', doublecount());
   

    this.store.dispatch(getCategoriesActions());
  }

  toggleActive() {
    this.isActive = !this.isActive;
  }
  statusResult(status: Status): string{
      switch(status) {
          case 'loading':
               return 'loading satus';
              break;
          case 'loaded':
                return 'loaded';
                break;
         default:
                return 'error';       
       }
  }

  child(event: Event){
    //event.stopPropagation();
    //alert('child');
    document.getElementById("child")?.addEventListener("click", () => {
      console.log("Child clicked");
    });
  }

  parent(event: Event){
   // alert('parent');
    document.getElementById("parent")?.addEventListener("click", () => {
      console.log("parent clicked");
    });
  }

  handleOuterDivCapture(){
    console.log('capture of parent')
  }
  handleInnerDivCapture(){
    console.log('capture of child')
  }
  
  handleListClick(event: Event){
    if(event.target instanceof HTMLElement){
       const clickedItem = event.target.textContent;
       console.log('event deligation', clickedItem);
    }
  }

  submit(){
    this.loginForm.markAllAsTouched();
    if(!this.loginForm.valid) {
       console.log(this.loginForm.value);
       return;
    }
    console.log(this.loginForm.value);
  }
  
}
