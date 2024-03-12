"use server"

import { connectToDatabase } from "../mongoose"

export async function createQuestion(values: any) {
  try {
    connectToDatabase();
    // const res = await fetch("/api/questions", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(values),
    // });
    // return res.json();
  } catch (error) {
    
  }
}