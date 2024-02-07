import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@common/components/button';

/**
 * Компонент переключения языкового типа приложения - рус/англ
 */
export const LanguageButton = (): React.ReactElement => {
  const { i18n } = useTranslation();

  return (
    <Button
      primary
      type="button"
      onClick={
        i18n.language === 'ru'
          ? () => i18n.changeLanguage('en')
          : () => i18n.changeLanguage('ru')
      }
      label={i18n.language}
    />
  );
};
