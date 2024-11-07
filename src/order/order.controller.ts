import { Body, Controller, Get, Post, Param } from "@nestjs/common";
import { OrderService } from "./order.service";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // @Post()
  // async createOrder(@Body() body: any) {
  //   return await this.orderService.createOrder(
  //     body.customerId,
  //     body.orderItems,
  //   );
  // }

  @Get(":id")
  async getOrderById(@Param("id") id: number) {
    return await this.orderService.getOrderById(id);
  }
}
