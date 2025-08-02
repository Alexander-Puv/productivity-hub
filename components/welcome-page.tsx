import { createClient } from '@/lib/supabase/server';
import { hasEnvVars } from '@/lib/utils';
import { AuthButton } from './auth-button';
import { EnvVarWarning } from './env-var-warning';
import { redirect } from 'next/navigation';

export async function WelcomePage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (user) redirect('/dashboard/todos')

  return (
    <>
      <p>Please sign in to access your dashboard and stay productive.</p>
      {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
    </>
  )
}