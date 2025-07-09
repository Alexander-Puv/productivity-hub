'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '../supabase/server'

interface addRecordProps {
  tableName: string
  values: object
  revalidate?: string
}

export async function addRecord({tableName, values, revalidate = '/dashboard'}: addRecordProps) {
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
