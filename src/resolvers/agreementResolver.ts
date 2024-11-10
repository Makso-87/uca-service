import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { db } from '../db';
import { Agreement } from '../entities/Agreement';
import { CreateAgreementInput, DeleteAgreementInput } from '../inputs/AgreementInputs';
import { AgreementType } from '../entities/AgreementType';
import { getCreateAgreementInputErrorText } from '../utils/getCreateAgreementInputErrorText';

@Resolver()
export class AgreementResolver {
  @Query(() => [Agreement])
  async agreements() {
    return await db.manager.find(Agreement, {
      relations: { type: true },
    });
  }

  @Mutation(() => Agreement)
  async createAgreement(@Arg('input') input: CreateAgreementInput) {
    const { name, agreementTypeId } = input;

    if (!name || !agreementTypeId) {
      throw new Error(getCreateAgreementInputErrorText({ name, agreementTypeId }));
    }

    const agreementType = await db.manager.findOne(AgreementType, { where: { id: agreementTypeId } });

    if (!agreementType) {
      return new Error(`Тип договора с id: ${agreementTypeId} не найден. Укажите существующий тип договора.`);
    }

    const newAgreement = db.manager.create(Agreement, { name, typeId: agreementType.id });

    newAgreement.type = agreementType;

    await db.manager.save(Agreement, newAgreement);

    return newAgreement;
  }

  @Mutation(() => [String])
  async deleteAgreement(@Arg('input') input: DeleteAgreementInput) {
    const { ids } = input;
    await db.manager.softDelete(Agreement, ids);

    return ids;
  }
}
