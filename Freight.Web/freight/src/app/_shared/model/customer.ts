export class Customer {
  constructor(
    public customerID: number,
    public businessID: number,
    public companyName: string,
    public email: string,
    public apEmail: string,
    public updatedBy: string,
  ) { }
}