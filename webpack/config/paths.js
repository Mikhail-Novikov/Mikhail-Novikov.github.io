const path = require('path');

const appPaths = {
  // папка с исходниками приложения
  appDir: path.resolve(__dirname, '../../src'),
  // папка с общими элементами приложения (утилиты, компоненты и т.п.)
  appCommon: path.resolve(__dirname, '../../src/common'),
  // папка с модулями приложения
  appFeatures: path.resolve(__dirname, '../../src/features'),
  // папка с конфигурацией redux-store приложения
  appStore: path.resolve(__dirname, '../../src/store'),
  // папка с макетами приложения
  appLayouts: path.resolve(__dirname, '../../src/layouts'),
  // папка с контекстом приложения
  appСontext: path.resolve(__dirname, '../../src/context'),
  // папка с контейнерами страниц приложения
  appPages: path.resolve(__dirname, '../../src/pages'),
  // папка с процессами приложения
  appProcesses: path.resolve(__dirname, '../../src/processes'),
  // папка с билдом приложения
  appDocs: path.resolve(__dirname, '../../docs'),
  // папка с ресурсами приложения (картинками шрифтами и пр.)
  appAssets: path.resolve(__dirname, '../../public'),
  // папка со стилями
  appStyles: path.resolve(__dirname, '../../src/common/styles'),
  // точка входа в приложение
  appIndex: path.resolve(__dirname, '../../src/index.tsx'),
  // точка входа в приложение в режиме разработки
  appDevIndex: path.resolve(__dirname, '../../src/index.dev.ts'),
  // HTML шаблон приложения
  appHTMLTemplate: path.resolve(__dirname, '../../public/index.html'),
  // Favicon приложения
  appFavicon: path.resolve(__dirname, '../../docs/logo.png'),
  // путь к папке package.json
  appPackageJson: path.resolve(__dirname, '../../package.json'),
};

module.exports = appPaths;
