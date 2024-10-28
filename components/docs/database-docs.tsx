import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function DatabaseDocs() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Database Setup</CardTitle>
          <CardDescription>
            NextLaunch uses Prisma with PostgreSQL as the default database
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Environment Setup</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# Database URL in your .env file
DATABASE_URL="postgresql://user:password@localhost:5432/nextlaunch"`}</code>
            </pre>
            
            <h4 className="font-medium">Local Development</h4>
            <ol className="list-decimal list-inside space-y-2">
              <li>Install PostgreSQL locally or use a Docker container</li>
              <li>Create a new database</li>
              <li>Update your DATABASE_URL in .env</li>
              <li>Run Prisma migrations: <code className="bg-muted px-1.5 py-0.5 rounded">npx prisma db push</code></li>
            </ol>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Schema Overview</h3>
            <div className="grid gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">User Model</h4>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code>{`model User {
  id                 String    @id @default(cuid())
  name               String?
  email              String?   @unique
  emailVerified      DateTime?
  image              String?
  accounts           Account[]
  sessions           Session[]
  stripeCustomerId   String?   @unique
  subscriptionId     String?   @unique
  subscriptionStatus String?
  teams              TeamMember[]
}`}</code>
                </pre>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Team Models</h4>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code>{`model Team {
  id          String       @id @default(cuid())
  name        String
  slug        String       @unique
  members     TeamMember[]
  invitations Invitation[]
}

model TeamMember {
  id        String   @id @default(cuid())
  role      Role     @default(MEMBER)
  teamId    String
  userId    String
  team      Team     @relation(fields: [teamId], references: [id], onDelete: Cascade)
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}`}</code>
                </pre>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Usage Example</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`import { prisma } from "@/lib/prisma"

// Create a new team
const team = await prisma.team.create({
  data: {
    name: "My Team",
    slug: "my-team",
    members: {
      create: {
        userId: "user_id",
        role: "OWNER",
      },
    },
  },
})`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Deployment</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                For production, we recommend using:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Vercel Postgres</li>
                <li>Supabase</li>
                <li>Railway</li>
                <li>Neon</li>
              </ul>
            </div>
          </section>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prisma Studio</CardTitle>
          <CardDescription>
            Visual database browser and editor
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Run Prisma Studio locally to manage your database:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>npx prisma studio</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
