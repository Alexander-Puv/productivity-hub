import DashboardPage from "@/components/dashboard-page";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient()
  const { data: {user}, error } = await supabase.auth.getUser();
  if (error || !user) {
    redirect("/auth/login");
  }

  const todos = (await supabase.from('todos').select()).data as ITodo[] | null
  
  return (
    <main className="flex justify-center">
      <DashboardPage recievedTodos={todos} />
    </main>
  )
}