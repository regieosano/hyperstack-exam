import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OrderService } from "./order.service";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() body: { customerId: number; products: number[] }) {
    return await this.orderService.createOrder(body.customerId, body.products);
  }

  @Get(":id")
  async getOrderById(@Param("id") orderId: number) {
    return await this.orderService.getOrderById(orderId);
  }
}
