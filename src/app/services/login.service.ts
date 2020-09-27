import { Injectable } from '@angular/core';
import { ILoginService } from '../interfaces/i-login-service';

@Injectable({
  providedIn: 'root',
})
export class LoginService implements ILoginService {
  private adminAccount = { userName: 'admin', password: '1234' };
  private accessGranted = false;

  constructor() {}

  validateLogin(userName: string, password: string) {
    if (
      userName === this.adminAccount.userName &&
      password === this.adminAccount.password
    ) {
      this.accessGranted = true;
      return true;
    } else return false;
  }
  logOut() {
    this.accessGranted = false;
  }
  getAccess(): boolean {
    return this.accessGranted;
  }
}
