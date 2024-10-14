'use client';

import { Ticket, User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface Props {
  ticket: Ticket;
  users: Omit<User, 'password'>[];
}

export default function AssignTicket({ ticket, users }: Props) {
  const [isAssigning, setIsAssigning] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const assignTicket = async (userId: string) => {
    setError('');
    setIsAssigning(true);
    try {
      await axios.patch(`/api/tickets/${ticket.id}`, {
        assignedToUserId: userId === '0' ? null : userId,
      });
      router.refresh();
    } catch (_error) {
      setError('Unable to assign ticket to user');
    }

    setIsAssigning(false);
  };

  return (
    <>
      <Select
        defaultValue={ticket.assignedToUserId?.toString() || '0'}
        onValueChange={assignTicket}
        disabled={isAssigning}
      >
        <SelectTrigger>
          <SelectValue
            placeholder="Select User..."
            defaultValue={ticket.assignedToUserId?.toString() || '0'}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Unassign</SelectItem>
          {users?.map((user) => (
            <SelectItem
              key={user.id}
              value={user.id.toString()}
            >
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-destructive">{error}</p>
    </>
  );
}

