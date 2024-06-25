import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class ConsoleLogWhenCustomerIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent){
        console.log("Console 1 - Customer has been created with ID: " + event.eventData.id);
    }
}