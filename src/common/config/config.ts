import { apiUrl } from '@common/constants';

const createConfig = () => ({
  maxFileSize: 11000,
  environment: process.env.NODE_ENV,
  routes: {
    /** Authorization */
    authorization: { url: '/authorization', name: '' },
    /** Профиль пользователя */
    userProfile: { url: '/profile', name: '' },
    /** Список бюджетных позиций */
    budgetList: { url: '/', name: 'budget-list' },
    /** Карточка операции */
    budgetItem: { url: '/operation' },
    /** Список расходов */
    budgetCostList: { url: '/cost-list', name: 'cost-list' },
    /** Список доходов */
    budgetProfitList: { url: '/profit-list', name: 'profit-list' },
  },
  api: {
    /**
     * Получение информации список операций
     * @returns - Url для получения списка версий программы
     */
    getCategories: `${apiUrl.baseUrl}/operations`,
    /**
     * Получение информации об операции по id
     * @returns - Url
     */
    getOperation: `${apiUrl.baseUrl}/operations/`,
    /**
     * Регистрация нового пользователя
     * @returns - Url для регистрации
     */
    signupUser: `${apiUrl.baseUrl}/signup`,
    /**
     * Авторизация нового пользователя
     * @returns - Url для авторизации
     */
    signinUser: `${apiUrl.baseUrl}/signin`,
    /**
     * Профиль пользователя
     * @returns - Url для профиля
     */
    profileUser: `${apiUrl.baseUrl}/profile`,
  },
});

/** Общий Конфиг */
export const config: Readonly<ReturnType<typeof createConfig>> = createConfig();
