export class User {
  constructor(
    public userID: number,
    public businessID: number,
    public email: string,
    public firstName: string,
    public lastName: string,
    public updatedOn: string,
    public createdOn: string,
  ) { }
}
export class BusinessUser {
  constructor(
    public userID: number,
    public businessID: number,
    public businessUserID: number,
    public businessCompanyName: string,
    public createdOn: string,
    public isActive: boolean,
    public isAdmin: boolean,
    public isOwner: boolean,
    public updatedOn: string,
    public userEmail: string,
    public userFirstName: string,
    public userLastName: string
  ) { }
}

