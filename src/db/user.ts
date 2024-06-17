import { COLOR, RETRIEVAL_LIMIT } from '@/constants'
import { eq, type InferInsertModel, type InferSelectModel } from 'drizzle-orm'
import { z } from 'zod'
import { Controller } from './controller'
import { UserTable } from './schemas'

type UserInsertData = InferInsertModel<typeof UserTable>

type UserModel = InferSelectModel<typeof UserTable>

export class UserController extends Controller {
  static insertUser = async (userObject: UserInsertData) =>
    this.dbInstance.insert(UserTable).values(userObject)

  static updateColor = async (id: string, color: string) =>
    this.dbInstance.update(UserTable).set({ color }).where(eq(UserTable.id, id))

  static updateUsername = async (id: string, username: string) =>
    this.dbInstance
      .update(UserTable)
      .set({ username })
      .where(eq(UserTable.id, id))
}
