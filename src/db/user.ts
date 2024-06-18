import { COLOR, RETRIEVAL_LIMIT } from '@/constants'
import { InferInsertModel, InferSelectModel, eq } from 'drizzle-orm'
import { z } from 'zod'
import { Controller } from './controller'
import { UserTable } from './schemas'

type UserInsertData = InferInsertModel<typeof UserTable>

type UserModel = InferSelectModel<typeof UserTable>

export class UserController extends Controller {
  static insertUser = async (userObject: UserInsertData) =>
    this.dbInstance.insert(UserTable).values(userObject)

  static updateColor = async (userId: string, color: string) =>
    this.dbInstance
      .update(UserTable)
      .set({ color })
      .where(eq(UserTable.id, userId))

  static updateUsername = async (userId: string, username: string) =>
    this.dbInstance
      .update(UserTable)
      .set({ username })
      .where(eq(UserTable.id, userId))

  static userExists = async (userId: string) =>
    (await this.dbInstance.query.UserTable.findFirst({
      where: eq(UserTable.id, userId),
    }))
      ? true
      : false
}
