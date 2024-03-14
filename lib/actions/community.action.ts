import User from "@/app/database/user.model"
import { connectToDatabase } from "../mongoose"

export const getUsers = async (params: any) => {
  try {
    connectToDatabase()
    const users = await User.find({})
    return users
  } catch (error) {
    console.log(error)
  }
}