var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:userId', function(req, res) {
    res.send("welcome : "+req.params.userId);
});

module.exports = router;