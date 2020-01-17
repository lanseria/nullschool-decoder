import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, comment: "用户名" })
  username: string;

  @Column({ comment: "密码" })
  password: string;

  @Column({ nullable: true, comment: "年龄" })
  age: number;

}
