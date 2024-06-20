import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductModel from "../../../product/repository/sequelize/product.model";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;
  let productRepository: ProductRepository = new ProductRepository();
  let customerRepository: CustomerRepository = new CustomerRepository();
  let orderRepository: OrderRepository = new OrderRepository();

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  
  it("should create a new order", async () => {
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    const customer = new Customer("123", "Customer 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    const order = new Order("123", "123", [orderItem]);
    await orderRepository.create(order);

    const orderResult = await orderRepository.find(order.id);

    expect(orderResult).toStrictEqual(order);
  });

  it("should update an order", async () => {
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    const customer = new Customer("123", "Customer 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    let product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItems: OrderItem[] = [];
    let orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    orderItems.push(orderItem);
    const order = new Order("123", "123", orderItems);
    await orderRepository.create(order);

    product = new Product("234", "Product 2", 20);
    await productRepository.create(product);

    orderItem = new OrderItem(
      "2",
      product.name,
      product.price,
      product.id,
      2
    );
    orderItems.push(orderItem);
    order.changeItems(orderItems);
    await orderRepository.update(order);

    const orderResult = await orderRepository.find(order.id);

    expect(orderResult).toStrictEqual(order);
  });

  it("should find an order", async () => {
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    const customer = new Customer("123", "Customer 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    let product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    let orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    const order = new Order("123", "123", [orderItem]);
    await orderRepository.create(order);

    const orderResult = await orderRepository.find("123");

    expect(order).toStrictEqual(orderResult);
  });

  it("should find all orders", async () => {
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    const customer = new Customer("123", "Customer 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    let product1 = new Product("123", "Product 1", 10);
    await productRepository.create(product1);

    let orderItem1 = new OrderItem(
      "1",
      product1.name,
      product1.price,
      product1.id,
      2
    );
    const order1 = new Order("123", "123", [orderItem1]);
    await orderRepository.create(order1);

    let product2 = new Product("234", "Product 2", 20);
    await productRepository.create(product2);

    let orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      2
    );
    const order2 = new Order("234", "123", [orderItem2]);
    await orderRepository.create(order2);

    const ordersResult = await orderRepository.findAll();

    expect([order1, order2]).toStrictEqual(ordersResult);
  });

});
