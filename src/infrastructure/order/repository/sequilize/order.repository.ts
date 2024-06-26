import Order from "../../../../domain/checkout/entity/order";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface{
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.destroy({ where: { id: entity.id } });
    await this.create(entity);
  }

  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
        include: [{ model: OrderItemModel }]
      });
    } catch (error) {
      throw new Error("Order not found");
    }
  
    const orderItems = orderModel.items.map(item => 
      new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
    );
  
    const order = new Order(id, orderModel.customer_id, orderItems);
    return order;
  }

  async findAll(): Promise<Order[]> {
    let orderModels;
    try {
      orderModels = await OrderModel.findAll({
        include: [{ model: OrderItemModel }]
      });
    } catch (error) {
      throw new Error("Order not found");
    }
  
    const orders = orderModels.map(item => 
      new Order(
        item.id, 
        item.customer_id,
        item.items.map(item =>
          new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
        )
      )
    );
    return orders;
  }
}
