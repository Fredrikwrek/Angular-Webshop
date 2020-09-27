export interface ILoginService {
  validateLogin(userName: string, password: string): void;
  logOut(): void;
  getAccess(): boolean;
}
