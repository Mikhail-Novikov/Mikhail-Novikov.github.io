const merge = require('merge');
const { pathOr } = require('ramda');

const settings = require('./settings');
const paths = require('./paths');
const devServer = require('./dev-server');

const config = merge(settings, paths, devServer);

/**
 * Получение настроек
 * @example
 * getConfig('app.name', '');
 * @param path - Путь до настройки
 * @param defaultValue - Что вернется по умолчанию
 * @param separator - Разделитель
 * @returns - Значение настройки
 */
module.exports = (path, defaultValue = '', separator = '.') => {
  const pathSettings = path.split(separator);
  return pathOr(defaultValue, pathSettings, config);
};
