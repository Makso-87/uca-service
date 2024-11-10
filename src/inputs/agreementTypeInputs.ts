import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateAgreementTypeInput {
  @Field(() => String)
  name: string;
}

@InputType()
export class DeleteAgreementTypesInput {
  @Field(() => [String])
  ids: string;
}
