import React from 'react';

import { Layout } from '@layouts/index';

import { selectors } from '@features/operation';
import { Operation } from '@features/operation/components';

/**
 * Страница карточки операции
 * @returns - Компонент
 */
export const BudgetItemPage = (): React.ReactElement => {
  const data = selectors.useOperationSelector();

  return (
    <Layout>
      <Operation dataOperations={data} />
    </Layout>
  );
};
