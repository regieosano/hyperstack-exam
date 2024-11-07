import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./entities/order.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    // @InjectRepository(OrderItem)
    // private orderItemRepository: Repository<OrderItem>,
  ) {}

  // async createOrder(
  //   customerId: number,
  //   productsOrdered: number[],
  // ): Promise<Order> {
  //   const order = await this.orderRepository.create({
  //     customerId,
  //     products: productsOrdered,
  //   });
  //   return await this.orderRepository.save(order);
  // }

  async getOrderById(id: number): Promise<Order> {
    return await this.orderRepository.findOne({
      where: { id },
      relations: ["items"],
    });
  }
}
