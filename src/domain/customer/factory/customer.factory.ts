import Customer from "../entity/customer";
import { v4 as uuid } from "uuid";
import Address from "../value-object/address";
import { InputCreateCustomerDTO } from "../dto/customer-dto";

export default class CustomerFactory {
  public static create(name: string): Customer {
    return new Customer(uuid(), name);
  }

  public static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(uuid(), name);
    customer.changeAddress(address);
    return customer;
  }

  public static createWithAddressFromDTO(customerDTO: InputCreateCustomerDTO): Customer {
    const address = new Address(customerDTO.address.street, customerDTO.address.number, customerDTO.address.zip, customerDTO.address.city);
    const customer = new Customer(uuid(), customerDTO.name);
    customer.changeAddress(address);
    return customer;
  }
}
