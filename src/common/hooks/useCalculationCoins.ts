import { useMemo } from 'react';

import { calcSumm } from '@common/utils/calc-summ';

type TCalculationCoins = {
  summTotal: number;
  summProfit: number;
  summCost: number;
};

/**
 * Считает сумму затрат и дохода
 * @param
 * @returns - общая сумма, траты и доходы
 */
export const useCalculationCoins = (operations: any[]): TCalculationCoins => {
  const arrCost = operations?.filter(
    (operation: { type: string }) => operation.type === 'Cost',
  );

  const arrProfit = operations?.filter(
    (operation: { type: string }) => operation.type === 'Profit',
  );

  const summCost = Math.floor(calcSumm(arrCost));

  const summProfit = Math.floor(calcSumm(arrProfit));

  const summTotal = Math.floor(summProfit - summCost);

  return useMemo(
    () => ({
      summTotal,
      summProfit,
      summCost,
    }),
    [summTotal],
  );
};
