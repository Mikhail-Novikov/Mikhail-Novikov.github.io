import React from 'react';

import { CurrencySign } from '@common/components';
import { useCalculationCoins } from '@common/hooks';

/**
 * Компонент суммы (остатка или траты)
 */
export const BudgetsTotalAmount = (): React.ReactElement => {
  const { summTotal } = useCalculationCoins();
  let signClass = '';

  if (summTotal < 0) {
    signClass = 'txt-danger';
  } else {
    signClass = 'txt-success';
  }

  return (
    <span className="margin-left-8 txt-size-8 txt-danger">
      <span className={signClass}>
        <CurrencySign value={summTotal} />
      </span>
    </span>
  );
};
