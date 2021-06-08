const router = require('express').Router()
const Accounts = require('./accounts-model')
const { checkAccountPayload, checkAccountNameUnique, checkAccountId} = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  Accounts.getAll()
  .then( accounts => res.send(accounts))
  .catch(err => res.send(err))
})

router.get('/:id', checkAccountId, (req, res, next) => {
  Accounts.getById(req.params.id)
  .then( account => res.status(200).json(account))
  .catch( err => res.status(500).json(err))
})

router.post('/', checkAccountPayload, (req, res, next) => {
  
  Accounts.create(req.body)
  .then( account => res.status(202).json(account))
  .catch(err => res.status(500).json(err))
})

router.put('/:id', checkAccountId,  checkAccountPayload, checkAccountNameUnique,  (req, res, next) => {
  Accounts.updateById(req.params.id, req.body)
  .then(updated => res.status(202).json(updated))
  .catch(err => res.status(500).json(err))
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
  .then(deleted => res.status(200).json({msg: 'deleted'}))
  .catch(err => res.status(500).send(err))
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
