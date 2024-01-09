import { TTableList } from '@features/budget-item/types';

/**
 * Утилита считает сумму из TTableList { name: price }
 * @param arr - Поля из api
 * @returns - сумму из полей price
 */
export const calcSumm = (arr: TTableList[]): number =>
  arr?.reduce(
    (accumulator: number, currentValue: { name: string[] }) =>
      accumulator + Number(currentValue.name[3]),
    0,
  );
