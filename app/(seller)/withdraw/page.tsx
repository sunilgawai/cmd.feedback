import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { CreateTeamDialog } from "@/components/teams/create-team-dialog";
import { TeamListSkeleton } from "@/components/teams/team-list";
import { Suspense } from "react";
import GamesList from "@/components/game-cards";

export default async function SellerPage() {

  const games = [];
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Your Orders</h1>
          <p className="text-xl">Orders you own or assigned to you</p>
        </div>
        <CreateTeamDialog />
      </div>
      <div className="container mx-auto p-4">
        <Suspense fallback={<TeamListSkeleton />}>
          {games.length == 0 ? (
            <GamesList />
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-sm text-muted-foreground">Notthing found</p>
              <p className="text-sm text-muted-foreground">
                Notthing to show.
              </p>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
}
