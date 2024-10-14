'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  role?: string;
}

export default function MainNavLinks({ role }: Props) {
  const links = [
    {
      label: 'Dashboard',
      href: '/',
      adminOnly: false,
    },
    {
      label: 'Tickets',
      href: '/tickets',
      adminOnly: false,
    },
    {
      label: 'Users',
      href: '/users',
      adminOnly: true,
    },
  ];
  const currentPath = usePathname();

  return (
    <div className="flex items-center gap-2">
      {links
        .filter((link) => !link.adminOnly || role === 'ADMIN')
        .map(({ label, href }) => (
          <Link
            className={`navbar-link ${currentPath === href && 'cursor-default text-primary/70 hover:text-primary/60'}`}
            href={href}
            key={label}
          >
            {label}
          </Link>
        ))}
    </div>
  );
}
