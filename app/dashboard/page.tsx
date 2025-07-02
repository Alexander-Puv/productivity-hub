import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardForm from "../../components/dashboard-form";
import Todo from "@/components/ui/todo";

export default async function Page() {
  const supabase = await createClient()
  const { data: {user}, error } = await supabase.auth.getUser();
  if (error || !user) {
    redirect("/auth/login");
  }

  const todos = (await supabase.from('todos').select()).data as ITodo[] | null
  
  return (
    <main className="flex justify-center">
      <section className="w-full max-w-xl m-8 flex flex-col items-center gap-3">
        <DashboardForm />
        <div className="mb-2" />
        {todos?.map(todo => <Todo {...todo} key={todo.id} />)}
      </section>
    </main>
  )
}