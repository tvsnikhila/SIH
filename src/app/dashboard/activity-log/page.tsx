import { ActivityLogClient } from "@/components/dashboard/activity-log-client";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ActivityLogPage() {
  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Activity Log</CardTitle>
          <CardDescription>
            Keep track of all your farming activities here. A well-maintained log helps in better planning and analysis.
          </CardDescription>
        </CardHeader>
      </Card>
      <ActivityLogClient />
    </div>
  );
}
