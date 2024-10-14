'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { userSchema, type UserSchemaType } from '@/schemas/user';

import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface Props {
  user?: Omit<User, 'password'>;
}

export default function UserForm({ user }: Props) {
  const form = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<UserSchemaType> = async (values) => {
    if (user) {
      await axios.patch(`/api/users/${user.id}`, values);
      router.push(`/users`);
    } else {
      await axios.post('/api/users', values);
      router.push('/users');
    }
    router.refresh();
  };

  return (
    <div className="w-full rounded-md border p-4">
      <Form {...form}>
        <form
          className="w-full space-y-8"
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            defaultValue={user?.name}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter Full Name..."
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            defaultValue={user?.username}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter Username..."
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            defaultValue=""
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    required={!user}
                    {...field}
                    placeholder="Enter Password..."
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="role"
              defaultValue={user?.role}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Role..." />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="TECH">Tech</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {user ? 'Update User' : 'Create User'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
