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