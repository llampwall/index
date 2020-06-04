'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.text('content').notNullable()
      table.string('type')
      table.text('image_url', 600)
      table.text('link_url', 600)
      table.text('link_title')
      table.text('link_img', 600)
      table.text('link_desc', 600)
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable().onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostsSchema
