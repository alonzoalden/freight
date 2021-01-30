export class Fee {
  constructor(
    public businessID: number,
    public feeID: number,
    public feeType: string,
    public description: string,
    public feeAmount: string,
    public updatedOn: string,
    public createdOn: string,
  ) { }
}