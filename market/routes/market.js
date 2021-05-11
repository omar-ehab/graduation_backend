const router = require("express").Router();

const marketController = require("../controllers/MarketController");

router.get('/', marketController.index);

router.post('/', marketController.create);

router.get('/:id', marketController.show_market);

router.put('/:id/update', marketController.update_market);

router.delete('/:id/destroy', marketController.delete_market);

router.post('/:id/withdraw', marketController.withdraw);

router.post('/:id/deposit', marketController.deposit);


module.exports = router;