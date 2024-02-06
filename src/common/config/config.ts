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
    /** Список категорий операций */
    categoryList: { url: '/categories', name: 'category-list' },
    /** Карточка операции */
    budgetItem: { url: '/operation' },
  },
  api: {
    /**
     * Получение списка категорий
     * @returns - Url для получения списка версий программы
     */
    getCategories: `${apiUrl.baseUrl}/categories`,
    /**
     * Получение категории по id
     * @returns - Url для получения списка версий программы
     */
    getCategory: `${apiUrl.baseUrl}/categories/`,
    /**
     * Получение списка операций
     * @returns - Url для получения списка версий программы
     */
    getOperations: `${apiUrl.baseUrl}/operations`,
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
    /**
     * Замена старого пароля
     * @returns - Url для замены пароля
     */
    profileChangePassword: `${apiUrl.baseUrl}/profile/change-password`,
  },
});

/** Общий Конфиг */
export const config: Readonly<ReturnType<typeof createConfig>> = createConfig();
