import { CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Field, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class Base {
  @PrimaryColumn()
  @Field()
  id: string = uuid();

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  @Field()
  deletedAt: Date;
}
