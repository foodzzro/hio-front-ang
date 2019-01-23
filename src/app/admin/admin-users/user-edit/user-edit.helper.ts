import { environment } from "src/environments/environment";


export class UserEditHelper {

    prepareRoles(data) {
        return {
            list: environment.userRoles,
            selected: data.roles ? data.roles[0] : ''
        }
    }

    prepareFormData(userForm, data) {

        userForm.get("userPassword").clearValidators();
        userForm.controls.userEmail.setValue(data.email);
        userForm.controls.userPassword.setValue('');
        userForm.controls.userPhone.setValue(data.phone);
        userForm.controls.userFirstName.setValue(data.firstName)
        userForm.controls.userLastName.setValue(data.lastName);
        userForm.controls.active.setValue(data.active);

        return userForm;
    }

    convertFormData(data, userForm) {
        return  {
          id: data.id,
          email: userForm.value.userEmail,
          firstName: userForm.value.userFirstName,
          lastName: userForm.value.userLastName,
          phone: userForm.value.userPhone,
          active: userForm.value.active
        }
      }
}