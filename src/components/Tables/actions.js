import * as types from './constants';

const urls = [
    'https://next.json-generator.com/api/json/get/VJRJrxKtE',
    'https://next.json-generator.com/api/json/get/EJhh-gKtN',
    'https://next.json-generator.com/api/json/get/V1iMBgYK4',
    'https://next.json-generator.com/api/json/get/EJf2SxFFE',
];

const rand = () =>  urls[Math.floor(Math.random() * urls.length)];

export const getTables = () => ({
    types: [
        types.TABLES_LOAD_REQUEST,
        types.TABLES_LOAD_SUCCESS,
        types.TABLES_LOAD_FAILURE,
    ],
    promise: api => api({
        url: rand(),
        method: 'GET',
    }),
});