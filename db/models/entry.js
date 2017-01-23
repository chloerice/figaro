const Sequelize = require('sequelize')
const db = require('APP/db')
const unirest = require('unirest')
const testingAPIKey = require('../index').env.xMashapeKeys.development

// getEmotions makes the Mashape API call to MoodPatrol, the json result holds two objects
// with arrays of emotions, e.g.,
// { "groups": [
//     { "emotions": ["satisfied","privileged","loved","glad","cozy","content","peaceful",
//                   "blissful","joyful","ecstatic"],
//       "name":"joy" },
//     { "emotions": ["admiration","spoiled","appreciated","confident","energized",
//                    "complete","renewed","empowered"],
//       "name":"trust" }
//     ],
//   "text": "i love my life",
//   "lang":"en",
//   "ambiguous":"no",
//   "bullying":"no",
//   "bullyingPos":18 }

const Entry = db.define('entry', {
  text: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  primary_emotions: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  secondary_emotions: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
}, {
  instanceMethods: {
    getEmotions: function() {
      return unirest.post('https://shl-mp.p.mashape.com/webresources/jammin/emotionV2')
      .header('X-Mashape-Key', testingAPIKey)
      .header('Accept', 'application/json')
      .header('Content-Type', 'application/x-www-form-urlencoded')
      .send('lang=en')
      .send(`text=${this.text}`)
      .end(result =>
        Entry.update({
          primary_emotions: result.groups[0].emotions,
          secondary_emotions: result.groups[1].emotions
        }, {
          where: {
            id: this.id
          },
          returning: true
        }))
    }
  }
})

module.exports = Entry
