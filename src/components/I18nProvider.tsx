"use client"

import { useEffect } from 'react';
import '../lib/i18n';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // i18n yüklendiğinde bir şey yapmaya gerek yok, sadece import edilmesi yeterli
  }, []);

  return <>{children}</>;
} 