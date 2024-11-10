import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from './Base';
import { Field, ObjectType } from 'type-graphql';
import { AgreementType } from './AgreementType';

@Entity()
@ObjectType()
export class Agreement extends Base {
  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  typeId: string;

  @ManyToOne(() => AgreementType, (agreementType) => agreementType.agreements)
  @Field(() => AgreementType, { nullable: true })
  type: AgreementType;
}
