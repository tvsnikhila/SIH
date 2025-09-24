'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/hooks/use-language';

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  const onValueChange = (value: string) => {
    if (value === 'en' || value === 'ml') {
      setLanguage(value);
    }
  };

  return (
    <div className='px-2'>
        <Select onValueChange={onValueChange} defaultValue={language}>
        <SelectTrigger className="w-full">
            <SelectValue placeholder={t('language')} />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="en">{t('english')}</SelectItem>
            <SelectItem value="ml">{t('malayalam')}</SelectItem>
        </SelectContent>
        </Select>
    </div>
  );
}
