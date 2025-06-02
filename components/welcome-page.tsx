import { createClient } from '@/lib/supabase/server';
import { hasEnvVars } from '@/lib/utils';
import React from 'react'
import { EnvVarWarning } from './env-var-warning';
import { AuthButton } from './auth-button';
import { Button } from './ui/button';
import Link from 'next/link';

export async function WelcomePage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();

  return user ? (
    <>
      <p>You're logged in. Came here to see my BEAUTIFUL Welcome Page? Oh, so sweet of you!</p>
      <p>However</p>
      <p><span className="invisible">However</span> you</p>
      <p><span className="invisible">However you</span> can</p>
      <p><span className="invisible">However you can</span> stil</p>
      <p><span className="invisible">However you can stil</span> go</p>
      <p><span className="invisible">However you can stil go</span> to</p>
      <p><span className="invisible">However you can stil go to</span> <Button><Link href="/dashboard">Dashboard</Link></Button></p>
    </>
  ) : (
    <>
      <p>Please sign in to access your dashboard and stay productive.</p>
      {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
    </>
  )
}