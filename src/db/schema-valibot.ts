import {pgTable, text, integer, json} from 'drizzle-orm/pg-core';
import {createSelectSchema} from 'drizzle-valibot';
import {pipe, maxLength} from 'valibot';

const users = pgTable('users', {
    id: integer().generatedAlwaysAsIdentity().primaryKey(),
    name: text().notNull(),
    bio: text(),
    preferences: json()
});

const userSelectSchema = createSelectSchema(users, {
    name: (schema) => pipe(schema, maxLength(20)), // Extends schema
    bio: (schema) => pipe(schema, maxLength(1000)), // Extends schema before becoming nullable/optional
});