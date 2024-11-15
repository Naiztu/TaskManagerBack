import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "user",
})
export class User {
  @PrimaryGeneratedColumn({
    name: "id",
  })
  id: number;

  @Column({
    name: "email",
  })
  email: string;

  @Column({
    name: "password",
  })
  password: string;
}
