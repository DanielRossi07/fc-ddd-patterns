import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class ConsoleLogWhenCustomerIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent){
        console.log("Customer has been created with ID: " + event.eventData.id);
    }
}