import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}