'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { ArrowRight, BotMessageSquare, List, User } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const { t } = useLanguage();

    const quickLinks = [
        {
            title: t('get_advisory'),
            description: "Get AI-powered advice for your crops.",
            icon: <BotMessageSquare className="w-6 h-6 text-primary" />,
            href: "/dashboard/advisory"
        },
        {
            title: t('log_activity'),
            description: "Record a new farming activity.",
            icon: <List className="w-6 h-6 text-primary" />,
            href: "/dashboard/activity-log"
        },
        {
            title: t('edit_profile'),
            description: "Update your farm and personal details.",
            icon: <User className="w-6 h-6 text-primary" />,
            href: "/dashboard/profile"
        },
    ]

    return (
        <div className="flex flex-col gap-8">
            <Card className="bg-card/70">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline">{t('welcome')}</CardTitle>
                    <CardDescription>{t('welcome_message')}</CardDescription>
                </CardHeader>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {quickLinks.map(link => (
                     <Card key={link.href} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                            {link.icon}
                            <CardTitle>{link.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{link.description}</p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant="outline" size="sm" className="ml-auto">
                                <Link href={link.href}>
                                    Go <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('farm_overview')}</CardTitle>
                    <CardDescription>A quick look at your farm data and recent activities.</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Placeholder for farm overview stats and charts */}
                    <div className="text-center text-muted-foreground py-8">
                        <p>Farm overview and charts will be displayed here.</p>
                    </div>
                </CardContent>
                 <CardFooter>
                    <Button asChild variant="link" className="ml-auto">
                        <Link href="/dashboard/activity-log">
                            {t('view_full_log')}
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
