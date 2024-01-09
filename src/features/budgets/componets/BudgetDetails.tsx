import React from 'react';

import { CurrencySign } from '@common/components';
import { useCalculationCoins } from '@common/hooks';

/**
 * Компонент сумм траты и дохода
 */
export const BudgetDetails = (): React.ReactElement => {
  const { summCost, summProfit } = useCalculationCoins();

  return (
    <div className="flex-row align-items-center">
      <div className="margin-left-12 txt-primary txt-normal txt-size-8">
        Доход:
        <span className="txt-size-12">
          &nbsp;
          <CurrencySign value={summProfit} />
        </span>
      </div>
      <div className="margin-left-12 txt-danger txt-normal txt-size-8">
        Расход:
        <span className="txt-size-12">
          &nbsp;
          <CurrencySign value={summCost} />
        </span>
      </div>
    </div>
  );
};
