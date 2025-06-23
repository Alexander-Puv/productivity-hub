"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/hooks/useUserStore";

export function LogoutButton() {
  const router = useRouter();
  const {setUserEmail} = useUserStore()

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserEmail(null)
    router.push("/auth/login");
  };

  return <Button onClick={logout}>Logout</Button>;
}
