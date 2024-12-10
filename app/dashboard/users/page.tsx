"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserList } from "@/components/users/user-list";
import { AddUserDialog } from "@/components/users/add-user-dialog";
import { useUsers } from "@/hooks/api/use-users";
import { Skeleton } from "@/components/ui/skeleton";
import { UserPlus } from "lucide-react";
import { useState } from "react";

export default function UsersPage() {
  const { data: users, isLoading } = useUsers();
  const [showAddUser, setShowAddUser] = useState(false);

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <header className="border-b pb-4">
          <h1 className="text-2xl font-semibold">Gestion des utilisateurs</h1>
        </header>
        <div className="space-y-4">
          <Skeleton className="h-[400px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <header className="border-b pb-4">
        <h1 className="text-2xl font-semibold">Gestion des utilisateurs</h1>
      </header>

      <div className="flex justify-end">
        <Button onClick={() => setShowAddUser(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Ajouter un utilisateur
        </Button>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Liste des utilisateurs</h2>
          <UserList users={users?.results || []} />
        </div>
      </Card>

      <AddUserDialog open={showAddUser} onOpenChange={setShowAddUser} />
    </div>
  );
}