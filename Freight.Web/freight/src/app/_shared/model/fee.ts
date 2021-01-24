export class Fee {
  constructor(
    public BusinessID: string,
    public FeeType: string,
    public Description: string,
    public FeeAmount: string,
    public UpdatedOn: string,
    public CreatedOn: string,
  ) { }
}