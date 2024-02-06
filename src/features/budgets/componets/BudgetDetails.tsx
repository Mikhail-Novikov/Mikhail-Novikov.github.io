import React from 'react';

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
}): React.ReactElement => (
  <div className="flex-row align-items-center">
    <div className="margin-left-12 txt-primary txt-normal txt-size-8">
      Доходы:
      <span className="txt-size-12">
        &nbsp;
        <CurrencySign value={summProfit} />
      </span>
    </div>
    <div className="margin-left-12 txt-danger txt-normal txt-size-8">
      Расходы:
      <span className="txt-size-12">
        &nbsp;
        <CurrencySign value={summCost} />
      </span>
    </div>
  </div>
);
