export class Shipment {
  constructor(
    public ShipmentID: number,
    public BusinessID: number,
    public ShipperID: number,
    public CustomerID: number,
    public OriginFFW: number,
    public Origin3PL: number,
    public DestinationFFW: number,
    public Destination3PL: number,
    public HBLNumber: string,
    public MBLNumber: string,
    public ContainerNumber: string,
    public ETD: Date,
    public ETA: Date,
    public XTL: Date,
    public ISFFiled: boolean,
    public DeliveryLocationID: number,
    public Status: string,
    public Memo: string,
    public ShipperReference: string,
    public UpdatedBy: string,
    public UpdatedOn: Date,
    public CreatedBy: string,
    public CreatedOn: Date,
  ) { }
}
export class ShipmentLine {
  constructor(
    public ShipmentLineID: number,
    public ShipmentID: number,
    public ItemID: number,
    public Quantity: number,
    public UnitPrice: number,
    public UpdatedOn: Date,
    public CreatedOn: Date,
  ) { }
}
export class ShipmentPackage {
  constructor(
    public ShipmentPackageID: number,
    public BusinessID: number,
    public ShipmentID: number,
    public Status: string,
    public PackageNumber: string,
    public Dimension: string,
    public Weight: number,
    public WeightUnit: string,
    public ShipmentPackageRateID: number,
    public ShippingCarrierID: number,
    public ShippingServiceID: number,
    public ShippingPackageID: number,
    public TrackingNumber: string,
    public USPSPICNumber: string,
    public ShippingLabelPath: string,
    public ShipDate: Date,
    public IsRated: boolean,
    public IsLabeled: boolean,
    public IsManual: boolean,
    public UpdatedOn: Date,
    public CreatedOn: Date
  ) { }
}
export class ShipmentFee {
  constructor(
    public ShipmentFeeID: number,
    public ShipmentID: number,
    public FeeID: number,
    public FeeAmount: number,
    public UpdatedOn: Date,
    public CreatedOn: Date,
  ) { }
}
export class ShipmentContact {
  constructor(
    public ShipmentFeeID: number,
    public ShipmentID: number,
    public FeeType: number,
    public Description: number,
    public FeeAmount: number,
    public UpdatedOn: Date,
    public CreatedOn: Date,
  ) { }
}
export class ShipmentDetail {
  constructor(
    public Shipment: Shipment,
    public ShipmentLines: ShipmentLine[],
    public ShipmentPackages: ShipmentPackage[],
    public ShipmentFees: ShipmentFee[],
    public ShipmentContacts: ShipmentContact[],
  ) { }
}