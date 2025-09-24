'use client';

import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { UserNav } from './user-nav';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/hooks/use-language';
import { VoiceTranslator } from '@/components/voice-translator';

const getTitle = (pathname: string, t: (key: any) => string) => {
    if (pathname.includes('/advisory')) return t('advisory');
    if (pathname.includes('/profile')) return t('profile');
    if (pathname.includes('/activity-log')) return t('activityLog');
    return t('dashboard');
};

export function Header() {
    const pathname = usePathname();
    const { t } = useLanguage();
    const { state } = useSidebar();

    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SidebarTrigger className="sm:hidden" />
            <div className="flex items-center">
                <h1 className="text-2xl font-bold font-headline">{getTitle(pathname, t)}</h1>
            </div>
            <div className="ml-auto flex items-center gap-4">
                <VoiceTranslator />
                { state !== 'collapsed' && <UserNav /> }
            </div>
        </header>
    );
}
