const db = require('../../data/db-config')

const getAll = () => {
  return db.select('*').from('accounts')
}

const getById = id => {
  return db.select('*').from('accounts').where('id', id)
}

const create = account => {
  const {name, budget} = account;
  return db('accounts').insert({name, budget})
  }

const updateById = (id, account) => {
  console.log('called')
  
  return db('accounts')
    .where('id', id)
    .update({
      name: account.name,
      budget: account.budget
    })
  
}

const deleteById = id => {
  return db('accounts').where('id', id).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
