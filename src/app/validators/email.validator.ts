import { AuthService } from './../service/auth.service';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
export class EmailValidator {

    static verify_email(auth: AuthService, formGroup: FormGroup) {
        // return (control: FormControl) => { //control: AbstractControl
        // tslint:disable-next-line: forin
        for (let key in formGroup.controls) {
            if (formGroup.controls.hasOwnProperty(key)) {
                // tslint:disable-next-line: no-angle-bracket-type-assertion
                let control: FormControl = <FormControl>formGroup.controls[key];
                //  console.log(control.value);
                return auth.checkEmailNotTaken(control.value)
                    .then(res => {
                       //  console.log(res['dados']['status']);
                        // 0 - erro, 1 - existe email e 2 - não existe email registrado
                        if (res['dados']['status'] === '2') {
                            return null;
                        } else {
                           //  console.log('Validou!');
                            return { validemail: true };
                        }
                    });
            }

        }
    }
}

/*
export const emailMatcher = (control: AbstractControl): {[key: string]: boolean} => {
  const email = control.get('email');
  const confirm = control.get('confirm');
  if (!email || !confirm) return null;
  return email.value === confirm.value ? null : { nomatch: true };
};
*/