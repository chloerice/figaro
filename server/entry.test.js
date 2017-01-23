const db = require('APP/db')
const Entry = db.models('entry')
const request = require('supertest-as-promised')
const { expect } = require('chai')
const app = require('./start')

describe('/api/entries', () => {

  describe('GET entries for a given user', () => {

    before('create an entry', () =>
      db.didSync
      .then(() =>
        Entry.create({
          text: 'I couldn\'t be more unprepared for tomorrow, I\'m so tired.',
          journal_id: 1,
          user_id: 1
        })
        .then(entry => entry.getEmotions()))
    )

    it('successfully retrieves the user\'s entry', () =>
      request(app)
        .get(`/api/entries`)
        .then(entries => entries.filter(entry => entry.user_id === 1))
        .then(result => expect(result.length).to.equal(1))
    )
  })

  describe('POST new entry to given user\'s journal', () => {
    it('creates a new entry', () =>
      request(app)
        .post('/api/entries')
        .send({
          text: '',
          journal_id: 1,
          user_id: 1
        })
        .expect(201)
    )
  })

})
