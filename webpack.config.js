const { log } = require("console");
const path = require("path");

module.exports = {
    mode: "development",
    /** Исходный файл */
    entry: "./app/app.jsx",
    /** Определение конфигурацию для выходного файла */
    output:{
        /** Путь к каталогу выходного файла */
        path: path.resolve(__dirname, "./public"),
        publicPath: "/public/",
        /** Файл, который будет подключаться на веб-страницу */
        filename: "bundle.js",
    },
    /** Конфигурация сервера */
    devServer: {
        /** Использование  HTML5 History API */
        historyApiFallback: true,
        /** Настройки для статических файлов */
        static: {
            /** Указания пути к файлу */
            directory: path.join(__dirname, "/"),
        },
        port: 8082,
        /** При запуске сервера автоматически открывается в веб-браузере */
        open: true
    },
    /** Набор загрузчиков */
    module:{
        rules:[
            /** Загрузчик для jsx */
            {
                /** Тип файлов */
                test: /\.jsx?$/,
                /** Исключение из обработки */
                exclude: /(node_modules)/,
                /** Определение загрузчика */
                loader: "babel-loader",
                options:{
                    /** Используемые плагины */
                    presets:[ "@babel/preset-react"]
                }
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: 'file-loader'
            }
        ]
    }
}

/**
 * npm run dev - запус приложения
 * npm run build - генерирование файла с кодом javascript из jsx
 */

