import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const formatDate = (recivedDate: number | string | Date) => {
  const date = new Date(recivedDate)
  return `${date.getDate()}.${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}.${date.getFullYear()}`
}

export const formatTime = (recivedDate: number | string | Date) => {
  const date = new Date(recivedDate)
  return `${date.getHours()}:${date.getMinutes()}`
}

export const lastViewedNote = (notes: INotes[] | null) => {
  return notes && notes.length
    ? notes
      .filter(note => note.last_viewed)
      .sort((a, b) => new Date(b.last_viewed!).getTime() - new Date(a.last_viewed!).getTime())[0]
    : null
}