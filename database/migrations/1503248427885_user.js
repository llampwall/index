'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('fname', 60)
      table.string('lname', 60)
      table.text('profile_img', 254)
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('login_source', 60)
      table.text('info', 1000)
      table.text('token', 600)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
