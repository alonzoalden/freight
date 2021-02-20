export class Customer {
  constructor(
    public customerID: number,
    public businessID: number,
    public companyName: string,
    public email: string,
    public apEmail: string,
    public updatedBy: any,
    public createdBy: any,
  ) { }
}
export class Contact {
  constructor(
    public contactID: number,
    public customerID: number,
    public businessID: number,
    public fullName: string,
    public email: string,
    public title: string,
    public updatedBy: any,
    public createdBy: any,
  ) { }
}