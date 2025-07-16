'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '../supabase/server'

type AddRecordProps =
  | {
      tableName: 'folders'
      values: { title: string }
      revalidate?: string
    }
  | {
      tableName: 'notes'
      values: { folder_id: string; title?: string; content?: string }
      revalidate?: string
    }
  | {
      tableName: 'todos'
      values: { text: string; done: boolean }
      revalidate?: string
    }

export async function addRecord({tableName, values, revalidate = '/dashboard'}: AddRecordProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { error } = await supabase.from(tableName).insert({
    user_id: user.id,
    ...values
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath(revalidate)
  return { success: true }
}
