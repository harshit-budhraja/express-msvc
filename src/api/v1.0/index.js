var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
   res.send('GET route on v1.0');
});
router.post('/', function(req, res){
   res.send('POST route on v1.0');
});

module.exports = router;