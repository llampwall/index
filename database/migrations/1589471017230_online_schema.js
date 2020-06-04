'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OnlineSchema extends Schema {
  up () {
    this.create('onlines', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable().onDelete('cascade')
      table.text('socket_id').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('onlines')
  }
}

module.exports = OnlineSchema
