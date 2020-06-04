'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentsSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable().onDelete('cascade')
      table.integer('post_id').unsigned().references('id').inTable('posts').notNullable().onDelete('cascade')
      table.text('content').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('comments')
  }
}

module.exports = CommentsSchema
