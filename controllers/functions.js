const shipAddGet = require('./ships/shipAddGet');
const shipAddPost = require('./ships/shipAddPost');
const shipGet = require('./ships/shipGet');
const shipInfoGet = require('./ships/shipInfoGet');
const shipRemoveGet = require('./ships/shipRemoveGet');
const shipEditGet = require('./ships/shipEditGet');
const shipEditPost = require('./ships/shipEditPost');

const userRegisterGet = require('./user/userRegisterGet');
const userRegisterPost = require('./user/userRegisterPost');
const userLoginGet = require('./user/userLoginGet');
const userLoginPost = require('./user/userLoginPost');

module.exports = { shipAddGet, shipAddPost, shipGet, shipInfoGet, shipRemoveGet, shipEditGet, shipEditPost, userRegisterGet, userRegisterPost, userLoginGet, userLoginPost };
