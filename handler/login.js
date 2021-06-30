const cookieParser = require('cookie-parser');
const express = require('express');
const router = express.Router();

router.use(cookieParser());
router.get('/login', function(req, resp) {
    if (req.cookies['auth'] == null) {
        resp.send(":)");
    };
})