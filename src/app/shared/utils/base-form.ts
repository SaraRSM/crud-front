
import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Injectable({ providedIn: 'root'})
export class BaseForm {

    constructor() { }

    isValidField(form: AbstractControl|null): boolean {
        var flag = false;
        if (form != null) {
          flag = form.touched || form.dirty && !form.valid
        }
    
        return flag;
      }

    getErrorMessage(form: AbstractControl|null): string {
        let message = '';
        if (form) {
            const { errors } = form;
            if (errors) {
                const min = errors["minlength"];
                var minLength = 0;
                if (min) minLength = min.requiredLength;

                const messages:any = {
                    required: 'Campo requerido',
                    minlength: `El mínimo de caracteres son ${ minLength }`,
                    email: 'Formato invalido',
                    pattern: 'Formatop invalido',
                    minError: 'El rango no es correcto',
                    min: 'El rango no es correcto',
                    max: 'El rango no es correcto',
                    notEquivalentPasswords: 'Las contraseñas no coinciden'
                }

                const errorKey = Object.keys(errors).find(Boolean);
                if (errorKey) {
                    message = messages[errorKey];
                }
            }
        }
        return message;
      }
}
