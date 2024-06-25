import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class ConsoleLog2WhenCustomerIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent){
        console.log("Console 2 - Customer has been created with ID: " + event.eventData.id);
    }
}