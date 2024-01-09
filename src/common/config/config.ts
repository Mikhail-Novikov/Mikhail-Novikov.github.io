const createConfig = () => ({
  maxFileSize: 11000,
  environment: process.env.NODE_ENV,
  routes: {
    /** Authorized */
    authorized: { url: '/authorized', name: '' },
    /** Список бюджетных позиций */
    budgetList: { url: '/', name: 'budget-list' },
    /** Список доходов */
    budgetProfitList: { url: '/profit-list', name: 'profit-list' },
    /** Список расходов */
    budgetCostList: { url: '/cost-list', name: 'cost-list' },
    /** Карточка дохода */
    budgetProfit: { url: '/profit/:id', name: '' },
    /** Карточка расхода */
    budgetCost: { url: '/cost/:id', name: '' },
  },
});

/** Общий Конфиг */
export const config: Readonly<ReturnType<typeof createConfig>> = createConfig();
