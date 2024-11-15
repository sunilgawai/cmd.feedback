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

export default async function TeamsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const teams = await getTeams(session.user.id);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Games</h1>
        <CreateTeamDialog />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Games</CardTitle>
          <CardDescription>Games you own or are a member of</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TeamListSkeleton />}>
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-sm text-muted-foreground">
                No games found
              </p>
            </div>
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
