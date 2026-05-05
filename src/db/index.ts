import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema/index';
import { relations } from './relations/index';

export const db = drizzle(process.env.DATABASE_URL!, {
    schema,
    relations
});