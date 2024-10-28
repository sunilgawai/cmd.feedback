import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamMembers } from "@/components/teams/team-members";
import { InviteMemberDialog } from "@/components/teams/invite-member-dialog";
import { TeamNav } from "@/components/teams/team-nav";
import { TeamOverview } from "@/components/teams/team-overview";
import { notFound } from "next/navigation";

async function getTeam(slug: string) {
  const team = await prisma.team.findUnique({
    where: { slug },
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
      activities: {
        take: 5,
        orderBy: {
          createdAt: 'desc',
        },
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
          activities: true,
        },
      },
    },
  });

  if (!team) notFound();

  return team;
}

export default async function TeamPage({
  params,
}: {
  params: { slug: string };
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const team = await getTeam(params.slug);
  const userRole = team.members.find(
    (member) => member.userId === session.user.id
  )?.role;

  const canManageTeam = userRole === "OWNER" || userRole === "ADMIN";

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{team.name}</h1>
          {canManageTeam && <InviteMemberDialog teamId={team.id} />}
        </div>
        <TeamNav slug={team.slug} userRole={userRole} />
      </div>

      <TeamOverview team={team} />

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            Manage your team members and their roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TeamMembers 
            members={team.members} 
            teamId={team.id}
            currentUserId={session.user.id}
            userRole={userRole}
          />
        </CardContent>
      </Card>
    </div>
  );
}
