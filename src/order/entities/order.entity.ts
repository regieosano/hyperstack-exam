import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { OrderProduct } from "./order-product.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerId: number;

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.order)
  products: OrderProduct[];
}
