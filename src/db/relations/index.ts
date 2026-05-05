import { defineRelations } from "drizzle-orm";
import { users, sessions, accounts } from "../schema/auth";

export const relations = defineRelations({users, sessions, accounts}, (r) => ({
  users: {
    sessions: r.many.sessions({
      from: r.users.id,
      to: r.sessions.userId
    }),
    accounts: r.many.accounts({
      from: r.users.id,
      to: r.accounts.userId
    })
  },
  sessions: {
    user: r.one.users({
      from: r.sessions.userId,
      to: r.users.id
    })
  },
  accounts: {
    user: r.one.users({
      from: r.accounts.userId, 
      to: r.users.id
    })
  },
}));