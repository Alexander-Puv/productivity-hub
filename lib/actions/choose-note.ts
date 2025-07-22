'use server'

import { createClient } from '../supabase/server'

export const chooseNote = async (note: INotes) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('notes')
    .update({ last_viewed: new Date().toISOString() })
    .eq('id', note.id)

  if (error) console.error('Failed to update note:', error.message)
}