import EventDispatcher from "../../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "../customer-created.event";
import ConsoleLogWhenCustomerIsCreatedHandler from "./console-log-when-customer-is-created.handler";
import ConsoleLog2WhenCustomerIsCreatedHandler from "./console-log2-when-customer-is-created.handler";

describe("Customer created event test", () => {
    it("should log message when event is triggered", () => {
      const eventDispatcher = new EventDispatcher();

      const eventHandler1 = new ConsoleLogWhenCustomerIsCreatedHandler();
      const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
      eventDispatcher.register("CustomerCreatedEvent", eventHandler1);

      const eventHandler2 = new ConsoleLog2WhenCustomerIsCreatedHandler();
      const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
      eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
  
      const customerCreatedEvent = new CustomerCreatedEvent({
        id: "123"
      });

      eventDispatcher.notify(customerCreatedEvent);

      expect(spyEventHandler1).toHaveBeenCalledWith(customerCreatedEvent);
      expect(spyEventHandler2).toHaveBeenCalledWith(customerCreatedEvent);
    });
});