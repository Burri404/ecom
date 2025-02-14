import { CommonModule, JsonPipe } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, input, OnInit, Output, Self, signal, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, FormsModule, FormControl, NgControl, Validators} from '@angular/forms';
import {MatError, MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


// const CUSTOMINPUT_VALUE_ACCESSOR: any = {
//   provide: NG_VALUE_ACCESSOR,
//   multi: true,
//   useExisting: forwardRef(()=>InputComponent)
// }
// const CUSTOMINPUT_VALUE_VALIDATOR: any = {
//   provide: NG_VALIDATORS,
//   multi: true,
//   useExisting: forwardRef(()=> InputComponent)
// }

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, JsonPipe, CommonModule, MatProgressSpinnerModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    //CUSTOMINPUT_VALUE_ACCESSOR, CUSTOMINPUT_VALUE_VALIDATOR
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {

  disabled: boolean = false;
  @Input() label: any;
  @Input() placeholder: string = '';
  @Output() blur: EventEmitter<void> = new EventEmitter<void>();


  errorMessage = signal('');
  control:any;

  value = '';

  public onChangeCallback: (value: any) => void = () => {};
  public onTouchedCallback: () => void = () => {};
  public validateFn = (_:any) => {};


  constructor(@Self() public controlDir:NgControl){
    controlDir.valueAccessor = this;
  }

  ngOnInit(): void{
    console.log(this.placeholder);
    const control = this.controlDir.control;
    console.log('control', this.controlDir.control);
    // const validators = control?.validator ? [control.validator, Validators.required,
    //     Validators.maxLength(10)] : [ control?.validator, [Validators.required,
    //       Validators.maxLength(10)]];
    // console.log('validators', validators);
    control?.setValidators(control.validator);
    control?.updateValueAndValidity();
  }
  
 // ControlValueAccessor Interface
 writeValue(value: any) {
    this.value && this.controlDir.control?.setValue(value, { emitEvent: false})
}

 // ControlValueAccessor Interface
 registerOnChange(fn: any) {
  this.onChangeCallback = fn;
}

// ControlValueAccessor Interface
registerOnTouched(fn: any) {
  this.onTouchedCallback = fn;
}

onChange(){
    this.onChangeCallback(this.value);
    console.log(this.controlDir.control?.pending);
    //this.controlDir.control?.setValue(this.value, { emitEvent: false})
 }

 setDisabledState(disabled: boolean): void {
  this.disabled = disabled;
}

onblur() : void{
  this.onTouchedCallback();
  console.log(this.controlDir.control?.touched);
 }

// Validator Interface
public validate(c: FormControl) {
  return this.validateFn(c);
}
}
