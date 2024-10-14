import Link from 'next/link';
import { getServerSession } from 'next-auth';

import options from '@/app/api/auth/[...nextauth]/options';

import MainNavLinks from './main-nav-links';
import ToggleTheme from './toggle-theme';

export default async function MainNav() {
  const session = await getServerSession(options);

  return (
    <nav className="flex  justify-between">
      <MainNavLinks role={session?.user.role} />
      <div className="flex items-center gap-2">
        {session ? (
          <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
        ) : (
          <Link href="/api/auth/signin">Login</Link>
        )}
        <ToggleTheme />
      </div>
    </nav>
  );
}
