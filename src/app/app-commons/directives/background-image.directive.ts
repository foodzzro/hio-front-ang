import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[background-image]'
})
export class BackgroundImageDirective {

    @Input('background-image') 
    url: string;

    private elRef:ElementRef;

    constructor(el: ElementRef) {
      this.elRef = el;
    }

    ngAfterViewInit() {
        this.elRef.nativeElement.style.backgroundImage = `url('${this.url}')`;
    }
} 