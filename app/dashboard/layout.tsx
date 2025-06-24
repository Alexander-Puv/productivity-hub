'use client'

import { LogoutButton } from "@/components/logout-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Avatar from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [email, setEmail] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      setEmail(user?.email ?? null)
    })
  }, [])

  return (
    <main>
      <header className="relative w-full flex justify-between border-b border-b-foreground/10 h-16">
        <div className="h-full px-2 flex items-center">
          <Link href={"/"}><i className="font-semibold">LOGO</i></Link>
        </div>
        <div className="flex items-center p-3 px-5 text-sm">
          {pathname == '/dashboard' ?
            <span>Dashboard / <Link href='/dashboard/notes'><Button>Notes</Button></Link></span>
          :
            <span><Link href='/dashboard'><Button>Dashboard</Button></Link> / Notes</span>
          }
        </div>
        <div className="h-full px-2 flex items-center gap-2">
          <ThemeSwitcher />
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar email={email} />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="mr-2 p-4 grid gap-2 bg-accent rounded-md">
                <DropdownMenu.Label>Hey, {email}!</DropdownMenu.Label>
                <DropdownMenu.Item className="flex *:grow">
                  <LogoutButton />
                </DropdownMenu.Item>
                <DropdownMenu.Arrow className="mb-1 fill-accent" />
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </header>
      {children}
    </main>
  );
}