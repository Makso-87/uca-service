import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { db } from '../db';
import { User } from '../entities/User';
import { CreateUserInput, UsersDeleteInput } from '../inputs/userInputs';
import { getExistingUserErrorMessage } from '../utils/getExistingUserErrorMessage';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    return await db.manager.find(User);
  }

  @Mutation(() => User)
  async createUser(@Arg('input') input: CreateUserInput) {
    const { lastName, middleName, firstName, email, phone } = input;

    if (!email && !phone) {
      throw new Error('Для регистрации пользователю необходимо предоставить email или номер телефона');
    }

    const existUser = await db.manager.findOne(User, { where: [{ email }, { phone }] });

    if (existUser) {
      throw new Error(getExistingUserErrorMessage({ email, phone }, existUser));
    }

    const newUser = db.manager.create(User, { lastName, middleName, firstName, email, phone });
    await db.manager.save(User, newUser);

    return newUser;
  }

  @Mutation(() => [String])
  async deleteUsers(@Arg('input') input: UsersDeleteInput) {
    const { ids } = input;
    await db.manager.softDelete(User, ids);

    return ids;
  }
}
