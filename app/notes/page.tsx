import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  const { data: notes } = await supabase.from('notes').select()
  
  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}