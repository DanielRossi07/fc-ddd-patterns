import EventDispatcher from "../../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "../customer-created.event";
import ConsoleLogWhenCustomerIsCreatedHandler from "./console-log-when-customer-is-created.handler";

describe("Customer created event test", () => {
    it("should log message when customer is created", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new ConsoleLogWhenCustomerIsCreatedHandler();
      const spyEventHandler = jest.spyOn(eventHandler, "handle");

      eventDispatcher.register("CustomerCreatedEvent", eventHandler);
  
      const customerCreatedEvent = new CustomerCreatedEvent({
        id: "123",
        name: "Daniel",
        addressStreet: "Rua Valson",
        addressNumber: 321,
        addressCity: "São Paulo"
      });

      eventDispatcher.notify(customerCreatedEvent);

      expect(spyEventHandler).toHaveBeenCalledWith(customerCreatedEvent);
    });
});