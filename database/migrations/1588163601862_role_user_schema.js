'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoleUserSchema extends Schema {
  up () {
    this.create('role_users', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('role_id').unsigned().references('id').inTable('roles').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('role_users')
  }
}

module.exports = RoleUserSchema
