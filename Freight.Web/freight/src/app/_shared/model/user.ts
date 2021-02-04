export class User {
  constructor(
    public userID: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public updatedOn: string,
    public createdOn: string,
  ) { }
}