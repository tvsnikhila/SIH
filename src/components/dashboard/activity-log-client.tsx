'use client';

import { useState } from 'react';
import type { Activity } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ActivityForm } from './activity-form';
import { useLanguage } from '@/hooks/use-language';
import { Badge } from '../ui/badge';

const initialActivities: Activity[] = [
  {
    id: '1',
    date: new Date('2024-05-01'),
    activityType: 'Sowing',
    notes: 'Sowed new batch of paddy seeds.',
  },
  {
    id: '2',
    date: new Date('2024-05-15'),
    activityType: 'Irrigation',
    notes: 'Canal water released, irrigated the entire 5 acres.',
  },
  {
    id: '3',
    date: new Date('2024-05-20'),
    activityType: 'Fertilizer',
    notes: 'Applied first round of NPK fertilizer.',
  },
];

const activityTypeColors: { [key in Activity['activityType']]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
    'Sowing': 'default',
    'Irrigation': 'secondary',
    'Fertilizer': 'outline',
    'Pest Control': 'destructive',
    'Harvest': 'default',
    'Other': 'secondary'
}

export function ActivityLogClient() {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { t } = useLanguage();

  const addActivity = (activity: Omit<Activity, 'id'>) => {
    setActivities([
      { ...activity, id: new Date().toISOString() },
      ...activities,
    ]);
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>A log of your recent farming activities.</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="ml-auto gap-1">
              <PlusCircle className="h-4 w-4" />
              {t('log_activity')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('log_activity')}</DialogTitle>
              <DialogDescription>
                Fill in the details of the activity you want to log.
              </DialogDescription>
            </DialogHeader>
            <ActivityForm onSubmit={addActivity} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.length > 0 ? (
              activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.date.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={activityTypeColors[activity.activityType] || 'secondary'}>
                        {activity.activityType}
                    </Badge>
                  </TableCell>
                  <TableCell>{activity.notes}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No activities logged yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
