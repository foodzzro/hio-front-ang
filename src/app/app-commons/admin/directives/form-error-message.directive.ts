import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[form-error]'
})
export class FormErrorMessageDirective {

    @Input('form-error')
    type:string;

    @Input()
    trigger:any;

    @Input()
    form:any;

    private elRef:ElementRef;

    constructor(el: ElementRef, private translate:TranslateService, private renderer:Renderer2) {
      this.elRef = el;
    }

    ngOnChanges() {
      
      console.log(this.FormControl)
      const childs = this.elRef.nativeElement.children;
    
      if( this.isFormInvalid && !this.canRemoveChild(childs)) {
        this.translateKey(`form_validation.${this.FirstFormError}`, message => {
          this.elRef.nativeElement.insertAdjacentHTML('beforeend', this.getErrorLabel(message));
        });

      } else if( !this.FormControl.invalid && this.canRemoveChild(childs) ) {
        this.renderer.removeChild(this.elRef.nativeElement, childs[childs.length - 1]);
      } else if ( this.isFormInvalid && this.mustReplaceErrorMessage(childs) ) {

        this.renderer.removeChild(this.elRef.nativeElement, childs[childs.length - 1]);
        this.translateKey(`form_validation.${this.FirstFormError}`, message => {
          this.elRef.nativeElement.insertAdjacentHTML('beforeend', this.getErrorLabel(message));
        });
      }
    }

    getErrorLabel(message) {
      return `<span id="${this.FirstFormError}" class="form-error-message">${message}</span>`;
    }

    translateKey(translationKey, callback) {
      this.translate.get(translationKey).subscribe((translatedMessage: string) => {
        callback(translatedMessage);
      });
    }

    canRemoveChild(childs) {
      const lastChild = childs[childs.length - 1];
      return lastChild.className === "form-error-message";
    }

    mustReplaceErrorMessage(childs) {
      const lastChild = childs[childs.length - 1];
      console.log(lastChild.id, this.FirstFormError);
      return lastChild.id !== this.FirstFormError;
    }

    get FormControl() {
      return this.form.controls[this.type];
    }

    get FirstFormError() {
      return Object.keys(this.FormControl.errors)[0];
    }
    
    get isFormInvalid() {
      return this.FormControl.invalid && this.FormControl.dirty
    }
}

 