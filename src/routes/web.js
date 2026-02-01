const express = require('express') //app su dung express
const router = express.Router();
const {gethomePage, getAbcPage, gethoidanitPage,postCreateUser, getCreatePage} = require('../controllers/homeController') 

// khai bao route
router.get('/', gethomePage);

router.get('/abc', getAbcPage);

router.get('/hoidanit', gethoidanitPage)

router.get('/create', getCreatePage)

router.post('/create-user', postCreateUser)
module.exports = router; // export default