export class Item {
  constructor(
    public ItemID: string,
    public BusinessID: string,
    public ShipperID: string,
    public ItemNumber: string,
    public ItemName: string,
    public HTSCode: string,
    public FNSKU: string,
    public ASIN: string,
    public Weight: number,
    public WeightUnit: string,
    public UnitPrice: string,
    public Currency: string,
    public UpdatedOn: string,
    public CreatedOn: string,
  ) { }
}