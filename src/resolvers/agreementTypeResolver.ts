import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { db } from '../db';
import { AgreementType } from '../entities/AgreementType';
import { CreateAgreementTypeInput, DeleteAgreementTypesInput } from '../inputs/agreementTypeInputs';

@Resolver()
export class AgreementTypeResolver {
  @Query(() => [AgreementType])
  async agreementTypes() {
    return await db.manager.find(AgreementType, {
      relations: {
        agreements: true,
      },
    });
  }

  @Mutation(() => AgreementType)
  async createAgreementType(@Arg('input') input: CreateAgreementTypeInput) {
    const { name } = input;
    const existAgreementType = await db.manager.findOne(AgreementType, { where: { name } });

    if (existAgreementType) {
      throw new Error(`Тип договора с таким именем ${name} уже существует.`);
    }

    const newAgreementType = db.manager.create(AgreementType, { name });
    await db.manager.save(AgreementType, newAgreementType);

    return newAgreementType;
  }

  @Mutation(() => [String])
  async deleteAgreementType(@Arg('input') input: DeleteAgreementTypesInput) {
    const { ids } = input;
    await db.manager.softDelete(AgreementType, ids);

    return ids;
  }
}
