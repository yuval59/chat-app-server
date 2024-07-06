import { InferInsertModel, eq } from 'drizzle-orm'
import { DBController } from './controller'
import { UserModel } from './models'

export type UserInsertData = InferInsertModel<typeof UserModel> & {
  createdAt: Date
}

export class UserDBController extends DBController {
  static createUser = async (userObject: UserInsertData) =>
    this.dbInstance.insert(UserModel).values(userObject)

  static updateUser = async (
    userId: string,
    values: { color: string; username: string }
  ) =>
    this.dbInstance
      .update(UserModel)
      .set(values)
      .where(eq(UserModel.id, userId))

  static getUserById = async (userId: string) =>
    this.dbInstance.query.UserTable.findFirst({
      where: eq(UserModel.id, userId),
    })
}
