import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { Order } from "./entities/order.entity";
import { OrderProduct } from "./entities/order-product.entity";
import { Product } from "../products/entities/product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderProduct, Product])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
