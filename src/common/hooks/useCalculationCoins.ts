import { useEffect, useState } from 'react';

import { TTableList } from '@common/components/table/types';
import { calcSumm } from '@common/utils/calc-summ';
import { transformFieldsApi } from '@common/utils/transform-fields-api';

import { api } from '@features/budgets/api';

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
export const useCalculationCoins = (): TCalculationCoins => {
  const [operations, setOperations] = useState<TTableList[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.getPricesOperations();

        const transformRes = res.map((item) => transformFieldsApi(item));
        setOperations(transformRes);

        setLoading(false);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('useCalculationCoins error', error);
      }
    };
    fetch();
  }, []);

  const arrCost = operations?.filter(
    (operation: { tag: string }) => operation.tag === 'Cost',
  );

  const arrProfit = operations?.filter(
    (operation: { tag: string }) => operation.tag === 'Profit',
  );

  const summCost = loading ? 0 : Math.floor(calcSumm(arrCost));

  const summProfit = loading ? 0 : Math.floor(calcSumm(arrProfit));

  const summTotal = loading ? 0 : Math.floor(summProfit - summCost);

  return {
    summTotal,
    summProfit,
    summCost,
  };
};
