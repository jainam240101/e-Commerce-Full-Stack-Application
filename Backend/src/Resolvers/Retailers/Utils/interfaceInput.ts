/** @format */

export class createRetailerinterface {
  Name: string;
  Email: string;
  Password: string;
  CustomerCareNumber: string;
  Address: string;
}

export class loginInterface {
  Email: string;
  Password: string;
}

export class updateRetailerinterface {
  Name?: string;
  Email?: string;
  Retailer: any;
  Password?: string;
  CustomerCareNumber?: string;
  Address?: string;
}
