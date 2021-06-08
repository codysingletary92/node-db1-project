const Accounts = require('./accounts-model')


exports.checkAccountPayload = (req, res, next) => {
  const {name, budget} = req.body;

  if (!name || !budget){
    console.log('presence check check called')
    res.status(400).json({ message: "name and budget are required" })
  } else if (typeof name !== 'string'){
    console.log('check string called')
    res.status(400).json({ message: "name of account must be a string" })
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    console.log('length check called')
    res.status(400).json({ message: "name of account must be between 3 and 100" })
  } else if (typeof budget !== 'number') {
    console.log('budget check called')
    res.status(400).json({ message: "budget of account must be a number" })
  } else if (budget < 0) {
    res.status(400).json({ message: "budget of account is too large or too small" })
  } else {
    next();
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  console.log('uniquie check fired')
  Accounts.getAll()
  .then(accounts => {
    const acc = accounts.filter( account => account.name === req.body.name)
    if (acc.length === 0) {next()}
    else {res.status(400).json({ message: "that name is taken" })}
    
  })
}

exports.checkAccountId = (req, res, next) => {
  Accounts.getById(req.params.id)
  .then( account => {
    if ( account.length > 0) {
      console.log('next executed')
      next()
    } else {
      res.status(404).json({ message: "account not found" })
    }
  })

  
}
