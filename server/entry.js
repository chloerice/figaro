const db = require('APP/db')
const Entry = db.models('entry')

module.exports = require('express').Router()
  .get('/', (req, res, next) =>
    Entry.findAll()
    .then(entries => res.send(entries))
    .catch(next))
  .post('/', (req, res, next) =>
    Entry.create(req.body)
    .then(createdEntry => createdEntry.getEmotions())
    .spread((numEntriesUpdated, updatedEntryArr) => res.send(updatedEntryArr[0]))
    .catch(next))
  .put('/:id', (req, res, next) =>
    Entry.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    .spread((numEntriesUpdated, updatedEntryArr) => res.send(updatedEntryArr[0]))
    .catch(next))
  .delete('/:id', (req, res, next) =>
    Entry.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(deletedEntry => {
      if (deletedEntry) res.sendStatus(204)
    })
    .catch(next))
