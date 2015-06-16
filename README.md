# builder-page-meta
Plugin for bs-builder system which contains set of tasks for make some page structures
such as page title o page meta data, breadcrumbs, menu e.t.c.

[![NPM version](http://img.shields.io/npm/v/bs-builder-page-meta.svg?style=flat)](http://www.npmjs.org/package/bs-builder-page-meta)
[![Coveralls branch](https://img.shields.io/coveralls/bem-site/builder-page-meta/master.svg)](https://coveralls.io/r/bem-site/builder-page-meta?branch=master)
[![Travis](https://img.shields.io/travis/bem-site/builder-page-meta.svg)](https://travis-ci.org/bem-site/builder-page-meta)
[![David](https://img.shields.io/david/bem-site/builder-page-meta.svg)](https://david-dm.org/bem-site/builder-page-meta)
[![David](https://img.shields.io/david/dev/bem-site/builder-page-meta.svg)](https://david-dm.org/bem-site/builder-page-meta#info=devDependencies)

Плагин для [bs-builder](https://www.npmjs.com/package/bs-builder-core) предназначенный для реализации построения
вспомогательных данных для шаблонизации страницы, например заголовка, мета-информации, "хлебных крошек", меню и т.д.

![GitHub Logo](./logo.jpg)

## Установка

Пакет устанавливается как обычная npm зависимость
```
$ npm install --save bs-builder-page-meta
```

## Набор готовых задач сборки в пакете

### - [PageHeaderTitle](./src/tasks/page-header-title.es6)

Описание: Предназначен для генерации значения для элемента `<title>` в заголовке страницы.

Для каждой языковой версии каждой страницы создается поле header.title 
в котором находится строка состоящая из соответствующих title-ов всех родительских страниц 
начиная от корневой и заканчивая текущей страницей. title-ы страниц разделены символом "/".

### - [PageHeaderMeta](./src/tasks/page-header-meta.es6)

Описание: Предназначен для генерации данных для тегов `<meta>` в заголовке страницы.
В настоящее время создается следующий набор полей, которые добавляются в поле header.meta
языковой версии каждой страницы.

- ogUrl
- ogType
- description
- ogDescription
- keywords
- ogKeywords

### - [PageBreadcrumbs](./src/tasks/page-breadcrumbs.es6)

Описание: Предназначен для создания структуры "хлебных крошек" для страниц.

### - [PageSearchMeta](./src/tasks/page-search-meta.es6)

Описание: Специфическая задача сборки. Нужна для добавления специальных тегов для индексации
страницы сайта средствами внутреннего поиска Яндекса.

## Тестирование

Запуск тестов с вычислением покрытия кода тестами с помощью инструмента [istanbul](https://www.npmjs.com/package/istanbul):
```
npm test
```

Проверка синтаксиса кода с помощью: 
[jshint](https://www.npmjs.com/package/jshint),
[eslint](https://www.npmjs.com/package/eslint),
[jscs](https://www.npmjs.com/package/jscs)

```
npm run codestyle
```

Особая благодарность за помощь в разработке:

* Ильченко Николай (http://github.com/tavriaforever)
* Константинова Гела (http://github.com/gela-d)
* Гриненко Владимир (http://github.com/tadatuta)
* Абрамов Андрей (https://github.com/blond)

Разработчик Кузнецов Андрей Серргеевич @tormozz48
Вопросы и предложения присылать по адресу: tormozz48@gmail.com
