import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateTeamDialog } from "@/components/teams/create-team-dialog";
import { TeamList, TeamListSkeleton } from "@/components/teams/team-list";
import { Suspense } from "react";
import { Team } from "@prisma/client";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import GamesList from "@/components/game-cards";

async function getTeams(userId: string) {
  return await prisma.team.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
    include: {
      members: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
      _count: {
        select: {
          members: true,
        },
      },
    },
  });
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const teams = await getTeams(session.user.id);

  const games = [];
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Your Games</h1>
          <p className="text-xl">Games you own or are a member of</p>
        </div>
        <CreateTeamDialog />
      </div>
      {/* <Card> */}
      {/* <CardHeader>
          <CardTitle>Your Games</CardTitle>
          <CardDescription>Games you own or are a member of</CardDescription>
        </CardHeader> */}
      <div className="container mx-auto p-4">
        <Suspense fallback={<TeamListSkeleton />}>
          {games.length == 0 ? (
            <GamesList />
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-sm text-muted-foreground">No games found</p>
              <p className="text-sm text-muted-foreground">
                Add a game to get started
              </p>
            </div>
          )}
        </Suspense>
      </div>
      {/* </Card> */}
    </div>
  );
}
