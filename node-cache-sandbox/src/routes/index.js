const router = require('express').Router();

router.get('/health-check', (req, res) => {
    return res.send({ message: 'Healthy...' });
});

module.exports = router;
