"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "@/lib/api/types";
import { useState } from "react";
import { useUsers } from "@/hooks/api/use-users";

interface UserListProps {
  users: User[];
}

export function UserList({ users }: UserListProps) {
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("");
  const { data, isLoading } = useUsers({
    search,
    ordering,
    limit: 10,
  });

  const displayedUsers = data?.results || users;

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Rechercher un utilisateur..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={ordering} onValueChange={setOrdering}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="first_name">Prénom (A-Z)</SelectItem>
            <SelectItem value="-first_name">Prénom (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md bordering">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom complet</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedUsers.map((user) => (
              <TableRow key={user.uid}>
                <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}