import EventDispatcher from "../../../@shared/event/event-dispatcher";
import CustomerAddressChangeEvent from "../customer-address-change.event";
import ConsoleLogWhenCustomerAddressChangesHandler from "./console-log-when-customer-address-changes.handler";

describe("Customer address changed event test", () => {
    it("should log message when customer address is changed", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new ConsoleLogWhenCustomerAddressChangesHandler();
      const spyEventHandler = jest.spyOn(eventHandler, "handle");

      eventDispatcher.register("CustomerAddressChangeEvent", eventHandler);
  
      expect(
        eventDispatcher.getEventHandlers["CustomerAddressChangeEvent"][0]
      ).toMatchObject(eventHandler);

      const customerAddressChangedEvent = new CustomerAddressChangeEvent({
        id: "123",
        name: "Daniel",
        addressStreet: "Rua Valson",
        addressNumber: 321,
        addressCity: "São Paulo"
      });

      eventDispatcher.notify(customerAddressChangedEvent);

      expect(spyEventHandler).toHaveBeenCalledWith(customerAddressChangedEvent);
    });
});