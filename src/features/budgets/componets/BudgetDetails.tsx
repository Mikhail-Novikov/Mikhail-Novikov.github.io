/* eslint-disable prettier/prettier */
import React from 'react';
import { useTranslation } from 'react-i18next';

import { CurrencySign } from '@common/components';

/**
 * Компонент сумм траты и дохода
 */
export const BudgetDetails = ({
  summCost,
  summProfit,
}: {
  summCost: number;
  summProfit: number;
  }): React.ReactElement => {
  // eslint-disable-next-line id-length
  const { t } = useTranslation();

  return (
    <div className="flex-row align-items-center">
      <div className="margin-left-12 txt-primary txt-normal txt-size-8">
        {t('profit-list')}:
        <span className="txt-size-12">
          &nbsp;
          <CurrencySign value={summProfit} />
        </span>
      </div>
      <div className="margin-left-12 txt-danger txt-normal txt-size-8">
        {t('cost-list')}:
        <span className="txt-size-12">
          &nbsp;
          <CurrencySign value={summCost} />
        </span>
      </div>
    </div>
  );
};
