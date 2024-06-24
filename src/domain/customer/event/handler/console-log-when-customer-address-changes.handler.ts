import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangeEvent from "../customer-address-change.event";

export default class ConsoleLogWhenCustomerAddressChangesHandler implements EventHandlerInterface<CustomerAddressChangeEvent> {
    handle(event: CustomerAddressChangeEvent){
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.addressStreet}, ${event.eventData.addressNumber} - ${event.eventData.addressCity}`);
    }
}