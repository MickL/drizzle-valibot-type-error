import {pgTable, text, integer, json} from 'drizzle-orm/pg-core';
import {createSelectSchema} from 'drizzle-zod';
import {z} from 'zod';

const users = pgTable('users', {
    id: integer().generatedAlwaysAsIdentity().primaryKey(),
    name: text().notNull(),
    bio: text(),
    preferences: json()
});

const userSelectSchema = createSelectSchema(users, {
    name: (schema) => schema.max(20), // Extends schema
    bio: (schema) => schema.max(1000), // Extends schema before becoming nullable/optional
    preferences: z.object({theme: z.string()}) // Overwrites the field, including its nullability
});
