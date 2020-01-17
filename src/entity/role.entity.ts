import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class Role {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, comment: "权限名称" })
  name: string;

  @Column({ unique: true, comment: "标识" })
  identification: string;

  @Column({ unique: true, comment: "权限CODE" })
  value: string;

  @Column({ comment: "权限信息" })
  info: string;
}
