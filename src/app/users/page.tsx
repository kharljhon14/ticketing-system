import { getServerSession } from 'next-auth';

import UserForm from '@/components/user-form';
import UserTable from '@/features/users/user-table';

import prisma from '../../../prisma/db';
import options from '../api/auth/[...nextauth]/options';

export default async function UsersPage() {
  const session = await getServerSession(options);

  if (session?.user.role !== 'ADMIN') {
    return <p className="text-destructive">Admon access required</p>;
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
    },
  });

  return (
    <div>
      <UserForm />
      <UserTable users={users} />
    </div>
  );
}
