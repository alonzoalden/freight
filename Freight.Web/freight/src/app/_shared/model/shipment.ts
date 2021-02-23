export class Shipment {
  constructor(
    public shipmentID: number,
    public businessID: number,
    public shipperID: number,
    public customerID: number,
    public originFFW: number,
    public origin3PL: number,
    public destinationFFW: number,
    public destination3PL: number,
    public hblNumber: string,
    public mblNumber: string,
    public containerNumber: string,
    public etd: Date,
    public eta: Date,
    public txl: Date,
    public isfFiled: boolean,
    public deliveryLocationID: number,
    public status: string,
    public memo: string,
    public shipperReference: string,
    public updatedBy: string,
    public updatedOn: Date,
    public createdBy: string,
    public createdOn: Date,
    // public ShipmentID: number,
    // public BusinessID: number,
    // public ShipperID: number,
    // public CustomerID: number,
    // public OriginFFW: number,
    // public Origin3PL: number,
    // public DestinationFFW: number,
    // public Destination3PL: number,
    // public HBLNumber: string,
    // public MBLNumber: string,
    // public ContainerNumber: string,
    // public ETD: Date,
    // public ETA: Date,
    // public XTL: Date,
    // public ISFFiled: boolean,
    // public DeliveryLocationID: number,
    // public Status: string,
    // public Memo: string,
    // public ShipperReference: string,
    // public UpdatedBy: string,
    // public UpdatedOn: Date,
    // public CreatedBy: string,
    // public CreatedOn: Date,
  ) { }
}
export class ShipmentLine {
  constructor(
    public shipmentLineID: number,
    public shipmentID: number,
    public itemID: number,
    public quantity: string,
    public unitPrice: number,
    public itemItemName: number,
    public itemItemNumber: number,
    public itemHTSCode: number,
    public updatedOn: Date,
    public createdOn: Date,
  ) { }
}
export class ShipmentPackage {
  constructor(
    public shipmentPackageID: number,
    public businessID: number,
    public shipmentID: number,
    public status: string,
    public packageNumber: string,
    public dimension: string,
    public weight: number,
    public weightUnit: string,
    public shipmentPackageRateID: number,
    public shippingCarrierID: number,
    public shippingServiceID: number,
    public shippingPackageID: number,
    public shippingRate: number,
    public trackingNumber: string,
    public uspspicNumber: string,
    public shippingLabelPath: string,
    public shipDate: Date,
    public isRated: boolean,
    public isLabeled: boolean,
    public isManual: boolean,
    public updatedOn: Date,
    public createdOn: Date
  ) { }
}
export class ShipmentFee {
  constructor(
    public shipmentFeeID: number,
    public shipmentID: number,
    public feeID: number,
    public feeFeeType: string,
    public feeAmount: number,
    public updatedOn: Date,
    public createdOn: Date,
  ) { }
}
export class ShipmentContact {
  constructor(
    public shipmentContactID: number,
    public businessID: number,
    public shipmentID: number,
    public contactFullName: number,
    public contactEmail: number,
    public contactTitle: number,
    public contactID: number,
    public updatedBy: number
  ) { }
}
export class ShipmentDetail {
  constructor(
    public shipment: Shipment,
    public shipmentLines: ShipmentLine[],
    public shipmentPackages: ShipmentPackage[],
    public shipmentFees: ShipmentFee[],
    public shipmentContacts: ShipmentContact[],
  ) { }
}