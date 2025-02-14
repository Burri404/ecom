import { Directive, ElementRef, Host, HostBinding, HostListener, Input} from "@angular/core";

@Directive({
    selector : '[toupper-case]',
    standalone: true
})

export class ToupperCaseDirective {
    @Input() isActive: boolean = false;
     constructor(private el : ElementRef){
         console.log(el.nativeElement);
        //  this.el.nativeElement.innerText = 'red';
          //this.el.nativeElement.style.color = 'red';
          //this.el.nativeElement.innerText.value.toUppercase();
     }
     @HostBinding('style.color') color!: string;
     @HostBinding('class.active') get activeClass(){
         return this.isActive;
     }

     @HostListener('click') onclick() {
           // this.el.nativeElement.style.color = 'green';
            this.color = 'green';
     }
    
    //  @HostListener('mouseenter') onMouseEnter() {
    //     this.el.nativeElement.style.color ='purple';
    //   }
    //  @HostListener('mouseout') mouseout(){
    //     this.el.nativeElement.style.color = 'red';
    //  }
}