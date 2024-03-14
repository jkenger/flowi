"use server"

import User from "@/app/database/user.model";
import { connectToDatabase } from "../mongoose"

export async function getUserById(params: any){
  try{
    connectToDatabase();
    const {userId} = params;
    const user = await User.findOne({clerkId: userId});
    console.log("user", user)
    return user;
  }catch(e){
    console.log(e)
  }
}