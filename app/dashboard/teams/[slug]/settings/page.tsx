import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamSettingsForm } from "@/components/forms/team-settings-form";
import { PendingInvites } from "@/components/teams/pending-invites";
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
      invitations: {
        where: {
          expires: {
            gt: new Date(),
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!team) notFound();
  return team;
}

export default async function TeamSettingsPage({
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

  if (userRole !== "OWNER" && userRole !== "ADMIN") {
    redirect(`/dashboard/teams/${params.slug}`);
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Team Settings</h1>
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>General</CardTitle>
            <CardDescription>
              Manage your team settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TeamSettingsForm team={team} userRole={userRole} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Invitations</CardTitle>
            <CardDescription>
              Manage pending team invitations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PendingInvites 
              invitations={team.invitations} 
              teamId={team.id}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
