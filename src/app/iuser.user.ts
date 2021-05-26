export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  //password..?
  authorities: string[];
  enabled: boolean;
  credentialsNonExpired: boolean;
  accountNonLocked: boolean;
  accountNonExpired: boolean;
}
