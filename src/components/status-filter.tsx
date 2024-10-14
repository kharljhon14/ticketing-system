'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const statuses: { label: string; value?: string }[] = [
  {
    label: 'Open / Started',
  },
  {
    label: 'Open',
    value: 'OPEN',
  },
  {
    label: 'Started',
    value: 'STARTED',
  },
  {
    label: 'Closed',
    value: 'CLOSED',
  },
];

export default function StatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (status: string) => {
    const params = new URLSearchParams();

    if (status) {
      params.append('status', status);
    }

    const query = params.size ? `?${params.toString()}` : '0';
    router.push(`/tickets${query}`);
  };

  return (
    <Select
      defaultValue={searchParams.get('status') || ''}
      onValueChange={(status) => updateFilter(status)}
    >
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Filter by status..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {statuses.map((status) => (
            <SelectItem
              key={status.value || '0'}
              value={status.value || '0'}
            >
              {status.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
