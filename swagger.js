const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const router = require('express').Router();

/** @type {swaggerJsDoc.Options} */
let options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'CQ Discussion',
            version: '1.0.0',
            contact: {
                email: 'into@codequotient.com',
                name: 'CodeQuotient',
                url: 'https://codequotient.com',
            },
            description: "Discussion App",
        },
        servers: [
            {
                url: "http://localhost:5555",
            },
        ],
    },
    apis: ['./routes/*.js', './routes/*/*.js'],
}

const swaggerSpec = swaggerJsDoc(options);

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;