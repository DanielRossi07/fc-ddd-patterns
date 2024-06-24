import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerDTO from "../dto/customer-dto";
import Customer from "../entity/customer";
import CustomerCreatedEvent from "../event/customer-created.event";
import ConsoleLogWhenCustomerIsCreatedHandler from "../event/handler/console-log-when-customer-is-created.handler";
import CustomerFactory from "../factory/customer.factory";

export default class CustomerService {
    private eventDispatcher: EventDispatcher;

    constructor(eventDispatcher: EventDispatcher) {
        this.eventDispatcher = eventDispatcher;
    }

    createCustomer(customerDTO: CustomerDTO) {
        const customer = CustomerFactory.createWithAddressFromDTO(customerDTO);

        const customerRepository = new CustomerRepository();
        customerRepository.create(customer);

        const eventHandler = new ConsoleLogWhenCustomerIsCreatedHandler();
        this.eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        const customerCreatedEvent = new CustomerCreatedEvent({
            id: customer.id
        });
        this.eventDispatcher.notify(customerCreatedEvent);
    }

    changeCustomerAddress(customerDTO: CustomerDTO) {
        const customer = CustomerFactory.createWithAddressFromDTO(customerDTO);
        const eventHandler = new ConsoleLogWhenCustomerIsCreatedHandler();
        this.eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        const customerCreatedEvent = new CustomerCreatedEvent({
            id: customer.id,
            name: customer.name,
            addressStreet: customer.address.street,
            addressNumber: customer.address.number,
            addressCity: customer.address._city
        });
        this.eventDispatcher.notify(customerCreatedEvent);
    }
}