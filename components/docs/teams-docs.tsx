import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function TeamsDocs() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Team Management</CardTitle>
          <CardDescription>
            Learn how to use the team management features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Creating Teams</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`// Create a new team
const team = await prisma.team.create({
  data: {
    name: "My Team",
    slug: "my-team",
    members: {
      create: {
        userId: session.user.id,
        role: "OWNER",
      },
    },
  },
});`}</code>
            </pre>
            
            <h4 className="font-medium">Team Roles</h4>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>OWNER</strong> - Full control over team</li>
              <li><strong>ADMIN</strong> - Can manage members and settings</li>
              <li><strong>MEMBER</strong> - Basic access to team features</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Inviting Members</h3>
            <div className="grid gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Send Invitations</h4>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code>{`const invitation = await prisma.invitation.create({
  data: {
    teamId,
    email,
    role,
    token: crypto.randomBytes(32).toString("hex"),
    expires: addDays(new Date(), 7),
  },
});

// Send invitation email
await sendEmail({
  to: email,
  template: TeamInviteEmail,
  props: { ... },
});`}</code>
                </pre>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Activity Tracking</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`await logTeamActivity(teamId, userId, "member.invited", {
  invitedEmail: email,
  role: role,
});`}</code>
            </pre>
          </section>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Components</CardTitle>
          <CardDescription>
            Available team management components
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Team List</h4>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>{`<TeamList teams={teams} />`}</code>
              </pre>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Team Members</h4>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>{`<TeamMembers 
  members={team.members} 
  teamId={team.id}
  currentUserId={session.user.id}
  userRole={userRole}
/>`}</code>
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
