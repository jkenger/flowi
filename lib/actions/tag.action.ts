"use server"

import User from "@/app/database/user.model";
import { connectToDatabase } from "../mongoose"
import { GetTopInteractedTagsParams } from "./shared.types"

export const getTopInteractedTags = async (params: GetTopInteractedTagsParams) => {
  try {
    connectToDatabase();
    const { userId, limit } = params
    const user = await User.findById(userId);

    if(!user) throw new Error('User not found')

    // Get user's top interacted tags
    return [{_id: "1", name: "HTML"}, {_id: "2", name: "CSS"}]

  } catch (error) {
    console.log(error)
  }
}