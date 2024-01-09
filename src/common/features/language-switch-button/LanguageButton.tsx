import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@common/components/button';

/**
 * Компонент переключения языкового типа приложения - рус/англ
 */
export const LanguageButton = (): React.ReactElement => {
  const [isEnLang, setIsEnLang] = React.useState<boolean>(false);

  const { i18n } = useTranslation();

  useEffect(() => {
    if (isEnLang) {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('ru');
    }
  }, [i18n, isEnLang]);

  return (
    <Button
      primary
      type="button"
      size="small"
      onClick={() => setIsEnLang(!isEnLang)}
      label={isEnLang ? 'EN' : 'RU'}
    />
  );
};
