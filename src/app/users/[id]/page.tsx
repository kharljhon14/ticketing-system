import { getServerSession } from 'next-auth';

import options from '@/app/api/auth/[...nextauth]/options';
import UserForm from '@/components/user-form';

import prisma from '../../../../prisma/db';

interface Props {
  params: { id: string };
}

export default async function EditUserPage({ params }: Props) {
  const session = await getServerSession(options);

  if (session?.user.role !== 'ADMIN') {
    return <p className="text-destructive">Admon access required</p>;
  }
  const user = await prisma.user.findUnique({
    where: {
      id: Number.parseInt(params.id),
    },
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
    },
  });

  if (!user) {
    return <p className="text-destructive">User Not Found</p>;
  }

  return <UserForm user={user} />;
}
