// order/entities/order-product.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Order } from "./order.entity";
import { Product } from "../../products/entities/product.entity";

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, order => order.products)
  @JoinColumn({ name: "orderId" })
  order: Order;

  @ManyToOne(() => Product, product => product)
  @JoinColumn({ name: "productId" })
  product: Product;

  @Column("int")
  quantity: number;
}
