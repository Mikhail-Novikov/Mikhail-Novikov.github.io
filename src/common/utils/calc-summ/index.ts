import { TTableList } from '@features/operation/types';

/**
 * Утилита считает сумму из TTableList { name: price }
 * @param arr - Поля из api
 * @returns - сумму из полей price
 */
export const calcSumm = (arr: TTableList[]): number =>
  arr?.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (accumulator: number, currentValue: { nameColumns: any }) =>
      accumulator + currentValue.nameColumns[3],
    0,
  );
