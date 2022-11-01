[![Node.js CI](https://github.com/khloptsevps/gendiff-hr/workflows/Node.js%20CI/badge.svg?branch=master&event=push)](https://github.com/khloptsevps/gendiff-hr/actions) [![Maintainability](https://api.codeclimate.com/v1/badges/8a394bc756dc729b6f90/maintainability)](https://codeclimate.com/github/khloptsevps/gendiff-hr/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/8a394bc756dc729b6f90/test_coverage)](https://codeclimate.com/github/khloptsevps/gendiff-hr/test_coverage)

# Вычислитель отличий / Generate Difference
Учебный проект школы программирования ["Hexlet"](https://ru.hexlet.io/?ref=252944).

## Описание
Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например http://www.jsondiff.com/. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменении в конфигурационных файлах.

### Возможности утилиты:
  - Поддержка разных входных форматов: yaml, json
  - Генерация отчета в виде plain text, stylish и json

## Цель:

- ### Структуры данных и Алгоритмы
    - Научиться описывать внутреннее представление различий между файлами так, чтобы оно было максимально удобно;
    - Работа с деревьями и древовидной рекурсией;  

- ### Архитектура
    - Научиться выполнять такие операции как: чтение файлов, парсинг входящих данных, построение дерева различий, формирование необходимого вывода;
    - Новый уровень модульности и абстракций;
    - Работа с параметрами командной строки (более глубокое понимание работы ОС и командных интерпретаторов в частности)

- ### Тестирование и Отладка
    - Научиться писать автоматизированные тесты;
    - Для написания тестов используется фреймворк Jest;

- ### Работа с документацией.
    - [
commander.js](https://github.com/tj/commander.js)
    - [ini](https://github.com/npm/ini)
    - [js-yaml](https://github.com/nodeca/js-yaml)
    - [lodash](https://lodash.com/)
    - [jest](https://jestjs.io/)

## Setup

```sh
$ make install
```

## Пример использования
Поиск различий между двумя плоскими json-файлами
[![asciicast](https://asciinema.org/a/NHwHUlBfftyllEDvQb6tHfaDa.svg)](https://asciinema.org/a/NHwHUlBfftyllEDvQb6tHfaDa)

Поиск различий между двумя плоскими yml-файлами
[![asciicast](https://asciinema.org/a/8qOwcfnvpa4midyK6eT3uiGl8.svg)](https://asciinema.org/a/8qOwcfnvpa4midyK6eT3uiGl8)

Поиск различий между двумя плоскими ini-файлами
[![asciicast](https://asciinema.org/a/1ajzV1ZgcT1LhZMQoYIzMKmUl.svg)](https://asciinema.org/a/1ajzV1ZgcT1LhZMQoYIzMKmUl)

Поиск различий между двумя файлами с древовидной структурой. (json, yml, ini)
[![asciicast](https://asciinema.org/a/6QIONtVlNDp5iG2gtY4chOcbk.svg)](https://asciinema.org/a/6QIONtVlNDp5iG2gtY4chOcbk)

Генерация отчет Plain text  

[![asciicast](https://asciinema.org/a/9frtTWss3jH0jYnCym0j7bz9K.svg)](https://asciinema.org/a/9frtTWss3jH0jYnCym0j7bz9K)

Генерация отчета json

[![asciicast](https://asciinema.org/a/FPa7x4RfChvShGzOz4dKcokFy.svg)](https://asciinema.org/a/FPa7x4RfChvShGzOz4dKcokFy)
