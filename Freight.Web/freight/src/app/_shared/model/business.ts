export class Business {
    constructor(
      public businessID: number,
      public userID: number,
      public companyName: string,
      public isShipper: boolean,
      public is3PL: boolean,
      public isFFW: boolean
    ) { }
  }