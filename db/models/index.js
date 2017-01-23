'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const Journal = require('./journal')
const Entry = require('./entry')

User.hasMany(Journal) // Journals will have an associated user_id
Journal.hasMany(Entry) // Entries will have an associated journal_id

module.exports = { User, Journal, Entry }
