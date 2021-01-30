export class Item {
  constructor(
    public itemID: number,
    public businessID: number,
    public shipperID: number,
    public itemNumber: string,
    public itemName: string,
    public htsCode: string,
    public fnsku: string,
    public asin: string,
    public weight: number,
    public weightUnit: string,
    public unitPrice: number,
    public currency: string,
    public updatedOn: Date,
    public createdOn: Date,
  ) { }
}