export interface IUsuario {
  id?: number | void;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  pwd?: string | void;
}

export class Usuario implements IUsuario {
  id: number | void;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  pwd?: string | void;

  constructor(
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    id: number | void = undefined,
    pwd: string | void = undefined
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.email = email;
    this.pwd = pwd;
  }
}
