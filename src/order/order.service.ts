import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./entities/order.entity";
import { OrderProduct } from "./entities/order-product.entity";
import { Product } from "../products/entities/product.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(OrderProduct)
    private orderProductRepository: Repository<OrderProduct>,
  ) {}

  async createOrder(
    customerId: number,
    productOrders: number[],
  ): Promise<Order> {
    const order = await this.orderRepository.create({ customerId });
    // Input custId, array of product: [{productId, qty}]

    const savedOrder = await this.orderRepository.save(order);

    for (const productNo of productOrders) {
      const product = await this.productRepository.findOne({
        where: { id: productNo },
      });

      // if (!product || product.balance < product.) {
      //   throw new Error(
      //     `Product with ID ${productOrder.productId} does not have enough balance.`,
      //   );
      // }

      // product.balance -= productOrder.quantity;
      // await this.productRepository.save(product);

      // const orderProduct = await this.orderProductRepository.create({
      //   order: savedOrder,
      //   product: product,
      //   quantity: productOrder.quantity,
      // });

      // await await this.orderProductRepository.save(orderProduct);
    }

    return await this.orderRepository.findOne({
      where: { id: savedOrder.id },
      relations: ["products", "products.product"],
    });
  }

  async getOrderById(orderId: number): Promise<Order> {
    return await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ["products", "products.product"],
    });
  }
}
