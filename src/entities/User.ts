import { Column, Entity } from 'typeorm';
import { Base } from './Base';
import { Field, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class User extends Base {
  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  middleName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  email?: string;

  @Column()
  @Field()
  phone?: string;
}
