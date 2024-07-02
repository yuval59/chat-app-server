import { InferInsertModel, eq } from 'drizzle-orm'
import { Controller } from './controller'
import { UserModel } from './models'

type UserInsertData = InferInsertModel<typeof UserModel>

export class UserController extends Controller {
  static insertUser = async (userObject: UserInsertData) =>
    this.dbInstance.insert(UserModel).values(userObject)

  static updateColor = async (userId: string, color: string) =>
    this.dbInstance
      .update(UserModel)
      .set({ color })
      .where(eq(UserModel.id, userId))

  static updateUsername = async (userId: string, username: string) =>
    this.dbInstance
      .update(UserModel)
      .set({ username })
      .where(eq(UserModel.id, userId))

  static userExists = async (userId: string) =>
    (await this.dbInstance.query.UserTable.findFirst({
      where: eq(UserModel.id, userId),
    }))
      ? true
      : false
}
