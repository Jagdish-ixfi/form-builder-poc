const express = require('express');
const app = express();


app.prefix('/cms/form/', (router)=> router.use('/', require('./cmsRoutes')));
app.prefix('/front/form/', (router)=> router.use('/', require('./frontRoutes')))


module.exports = app;