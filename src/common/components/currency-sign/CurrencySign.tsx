import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  value: number;
}

/**
 * Компонент значения валюты
 */
export const CurrencySign: FC<Props> = ({ value }) => {
  // eslint-disable-next-line id-length
  const { t } = useTranslation();

  return (
    <span>
      {t('currency', {
        ruValue: value,
        enValue: value * 0.01115,
        formatParams: {
          ruValue: { currency: 'RUB', locale: 'ru-RU' },
          enValue: { currency: 'USD', locale: 'en-US' },
        },
      })}
    </span>
  );
};
