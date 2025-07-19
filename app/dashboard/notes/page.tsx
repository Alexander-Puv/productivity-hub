import FolderNavbar from "@/components/folder-navbar";
import NotesSection from "@/components/notes-section";
import { createClient } from "@/lib/supabase/server";
import { lastViewedNote } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  const folders = (await supabase.from('folders').select()).data as IFolders[] | null
  const notes = (await supabase.from('notes').select()).data as INotes[] | null

  return (
    <main className="min-h-[calc(100%-4rem)] flex flex-col">
      <FolderNavbar folders={folders} lastViewedFolderID={lastViewedNote(notes)?.folder_id || null} />
      <NotesSection notes={notes} />
    </main>
  )
}