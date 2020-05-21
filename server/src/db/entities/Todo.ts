import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  VersionColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  SelectQueryBuilder,
  BaseEntity,
} from "typeorm";

import { GraphqlContext } from "../../graphql/context";

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column()
  description: string;

  @Column({ type: "boolean", default: false })
  done: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;

  @DeleteDateColumn()
  deletedAt?: Date;

  // Auth

  canAccess(context: GraphqlContext): boolean {
    const { userId } = context.currentUser;
    return userId === this.userId;
  }

  canUpdate(context: GraphqlContext): boolean {
    return this.canAccess(context);
  }

  canDelete(context: GraphqlContext): boolean {
    return this.canAccess(context);
  }

  static protectedQuery(context: GraphqlContext) {
    const { userId } = context.currentUser;

    return (qb: SelectQueryBuilder<Todo>) => qb.where({ userId });
  }
}
