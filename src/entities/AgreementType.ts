import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from './Base';
import { Field, ObjectType } from 'type-graphql';
import { Agreement } from './Agreement';

@Entity()
@ObjectType()
export class AgreementType extends Base {
  @Column()
  @Field()
  name: string;

  @OneToMany(() => Agreement, (agreement) => agreement.type)
  @Field(() => [Agreement], { nullable: true })
  agreements: Agreement[];
}
