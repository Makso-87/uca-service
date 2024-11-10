import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateAgreementInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  agreementTypeId: string;
}

@InputType()
export class DeleteAgreementInput {
  @Field(() => [String])
  ids: string[];
}
