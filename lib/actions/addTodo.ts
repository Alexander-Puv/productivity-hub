'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '../supabase/server'

export async function addTodo(text: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { error } = await supabase.from('todos').insert({
    user_id: user.id,
    text,
    done: false,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  return { success: true }
}
