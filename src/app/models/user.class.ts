export class User {
    firstName: string = '';
    lastName: string = '';
    birthDate: any;
    street: string = '';
    houseNumber: number = 0;
    zipCode: number = 0;
    city: string = '';
    mail: string = '';
  
    constructor(obj?: any) {
      this.firstName = obj ? obj.firstName : '';
      this.lastName = obj ? obj.lastName : '';
      this.birthDate = obj ? obj.birthDate : '';
      this.street = obj ? obj.street : '';
      this.houseNumber = obj ? obj.houseNumber : '';
      this.zipCode = obj ? obj.zipCode : '';
      this.city = obj ? obj.city : '';
      this.mail = obj ? obj.mail : '';
    }
  }
  