import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AdminUsersService {

    serviceUrl = environment.service_URL;

    constructor(
        private http: HttpClient
    ) {

    }

    getUsers() {
        const url = `${this.serviceUrl}/admin/users/list`;
        return this.http.get(url);
    }

    saveUser(user, role) {
        const url = `${this.serviceUrl}/admin/users/create`;
        let body = new FormData();
        body.append("email", user.userEmail);
        body.append("password", user.userPassword);
        body.append("firstName", user.userFirstName);
        body.append("lastName", user.userLastName);
        body.append("phone", user.userPhone);
        body.append("active", user.active);
        body.append("role", role);

        return this.http.post(url, body).toPromise();
    }

    editUser(user, id, role) {
        const url = `${this.serviceUrl}/admin/users/update/${id}`;
        let body = new FormData();
        body.append("email", user.userEmail);
        body.append("password", user.userPassword);
        body.append("firstName", user.userFirstName);
        body.append("lastName", user.userLastName);
        body.append("phone", user.userPhone);
        body.append("active", user.active);
        body.append("role", role);

        return this.http.post(url, body).toPromise();
    } 

    deleteUser(user) {
        const url = `${this.serviceUrl}/admin/users/delete/${user.id}`;
        return this.http.delete(url).toPromise();
    }

    changeUserStatus(user) {
        const url = `${this.serviceUrl}/admin/users/change/status/${user.id}/${user.active}`;
        return this.http.get(url).toPromise();
    }
}