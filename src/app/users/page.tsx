import UserForm from '@/components/user-form';
import UserTable from '@/features/users/user-table';

import prisma from '../../../prisma/db';

export default async function UsersPage() {
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
