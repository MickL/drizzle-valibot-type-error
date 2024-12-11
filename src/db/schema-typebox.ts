import { pgTable, text, integer, json } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-typebox';
import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

const users = pgTable('users', {
    id: integer().generatedAlwaysAsIdentity().primaryKey(),
    name: text().notNull(),
    bio: text(),
    preferences: json()
});

const userSelectSchema = createSelectSchema(users, {
    name: (schema) => Type.String({ ...schema, maxLength: 20 }), // Extends schema
    bio: (schema) => Type.String({ ...schema, maxLength: 1000 }), // Extends schema before becoming nullable/optional
    preferences: Type.Object({ theme: Type.String() }) // Overwrites the field, including its nullability
});