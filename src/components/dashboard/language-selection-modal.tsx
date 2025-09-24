'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';

export default function LanguageSelectionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { setLanguage, t } = useLanguage();

  useEffect(() => {
    const langPreference = localStorage.getItem('krishi_sakha_language');
    if (!langPreference) {
      setIsOpen(true);
    }
  }, []);

  const handleLanguageSelect = (lang: 'en' | 'ml') => {
    setLanguage(lang);
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{t('select_language_title')}</DialogTitle>
          <DialogDescription>
            {t('select_language_description')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='sm:justify-center'>
          <Button onClick={() => handleLanguageSelect('en')} variant="outline" size="lg">
            {t('english')}
          </Button>
          <Button onClick={() => handleLanguageSelect('ml')} size="lg">
            {t('malayalam')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
