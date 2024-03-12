import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTimestamp(date: Date): string {
   const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
   let interval = Math.floor(seconds / 31536000);

   if (interval > 1) {
     return interval + " years ago";
   }
   interval = Math.floor(seconds / 2592000);
   if (interval > 1) {
     return interval + " months ago";
   }
   interval = Math.floor(seconds / 86400);
   if (interval > 1) {
     return interval + " days ago";
   }
   interval = Math.floor(seconds / 3600);
   if (interval > 1) {
     return interval + " hours ago";
   }
   interval = Math.floor(seconds / 60);
   if (interval > 1) {
     return interval + " minutes ago";
   }
   return Math.floor(seconds) + " seconds ago";

}

export function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
}