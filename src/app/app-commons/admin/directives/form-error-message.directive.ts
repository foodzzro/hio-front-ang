import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[form-error]'
})
export class FormErrorMessageDirective {

  @Input('form-error')
  type: string;

  @Input()
  form: FormGroup;

  control: AbstractControl;
  private elRef: ElementRef;

  constructor(el: ElementRef, private translate: TranslateService, private renderer: Renderer2) {
    this.elRef = el;
  }

  ngOnInit() {
    this.control = this.form.get(this.type);
    this.control.valueChanges.subscribe(value => {
      const childs = this.elRef.nativeElement.children;

      if (this.isFormInvalid && !this.canRemoveChild(childs)) {
        this.addErrorLabel();

      } else if (!this.FormControl.invalid && this.canRemoveChild(childs)) {
        this.renderer.removeChild(this.elRef.nativeElement, childs[childs.length - 1]);

      } else if (this.isFormInvalid && this.mustReplaceErrorMessage(childs)) {
        this.renderer.removeChild(this.elRef.nativeElement, childs[childs.length - 1]);
        this.addErrorLabel();
      } else if ( this.FormControl.value == '' && !this.canRemoveChild(childs) ){
        console.log("Heree");
        this.addErrorLabel();
      }
    })
  }

  addErrorLabel() {
    this.translateKey(`form_validation.${this.FirstFormError}`, message => {
      this.elRef.nativeElement.insertAdjacentHTML('beforeend', this.getErrorLabel(message));
    });
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
    return lastChild.id !== this.FirstFormError;
  }

  get FormControl() {
    return this.form.controls[this.type];
  }

  get FirstFormError() {
    return this.FormControl.errors ? Object.keys(this.FormControl.errors)[0] : '';
  }

  get isFormInvalid() {
    return this.FormControl.invalid && this.FormControl.dirty
  }
}

