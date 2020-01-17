import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class Permission {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  parentId: string;

  @Column({ comment: "菜单名称" })
  name: string;

  @Column({ comment: "菜单图标" })
  icon: string;

  @Column({ comment: "组件地址" })
  component: string;

  @Column({ comment: "组件名字" })
  componentName: string;

  @Column({ comment: "路径" })
  url: string;

  @Column({ comment: "一级菜单跳转地址" })
  redirect: string;

  @Column({ comment: "菜单排序" })
  sortNo: string;

  @Column({ comment: "类型（0：一级菜单；1：子菜单 ；2：按钮权限）" })
  menuType: number;

  @Column({ comment: "是否叶子节点: 1:是  0:不是" })
  leaf: boolean;

  @Column({ comment: "是否路由菜单: 0:不是  1:是（默认值1）" })
  route: boolean;

  @Column({ comment: "是否缓存页面: 0:不是  1:是（默认值1）" })
  keepAlive: boolean;

  @Column({ comment: "是否隐藏路由菜单: 0否,1是（默认值0）" })
  hidden: boolean;

  @Column({ comment: "外链菜单打开方式 0/内部打开 1/外部打开" })
  internalOrExternal: boolean;

  @Column({ comment: "描述" })
  description: string;

  @Column({ comment: "创建人" })
  createBy: string;

  @Column({ comment: "创建时间" })
  createTime: Date;

  @Column({ comment: "更新人" })
  updateBy: string;

  @Column({ comment: "更新时间" })
  updateTime: Date;

  @Column({ comment: "删除状态 0正常 1已删除" })
  delFlag: number;

  @Column({ comment: "是否配置菜单的数据权限 1是0否 默认0" })
  ruleFlag: number;
}
