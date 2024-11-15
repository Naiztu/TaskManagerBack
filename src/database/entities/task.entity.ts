import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity({
  name: "task",
})
export class Task {
  @PrimaryGeneratedColumn({
    name: "id",
  })
  id: number;

  @Column({
    name: "title",
  })
  title: string;

  @Column({
    name: "description",
  })
  description: string;

  @ManyToOne(() => User, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "user_id",
  })
  user: User;

  @Column({
    name: "user_id",
  })
  userId: number;
}
