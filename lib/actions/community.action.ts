import User from "@/app/database/user.model"
import { connectToDatabase } from "../mongoose"
import Tag from "@/app/database/tag.model"



export const getTags = async (params: any) => {
  try {
    connectToDatabase()
    const tags = await Tag.find({}).populate('questions')
    return tags 
  } catch (error) {
    console.log(error)
  }
}

// export const getCommunityUsers = async (params: any) => {
//   try {
//     const users = await getUsers(params)
//     const tags = await getTags(params)
    
//     return users?.map((user: any) => {
//       const userTags = tags?.filter((tag: any) => tag.questions.some((question: any) => question.author.toString() === user._id.toString()))
//       return {
//         ...user._doc,
//         tags: userTags?.map((tag: any) => tag.name)
//       }
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }