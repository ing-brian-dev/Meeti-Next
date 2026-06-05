import { defineRelations } from "drizzle-orm";
import * as schema from "../schema";

export const relations = defineRelations(schema, (r) => ({
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
  communityMembers: {
    community: r.one.community({
      from: r.communityMembers.communityId,
      to: r.community.id,
      optional: false
    }),
    user: r.one.users({
      from: r.communityMembers.userId,
      to: r.users.id,
      optional: false
    })
  },
  meeti: {
    location: r.one.meetiLocations({
      from: r.meeti.id,
      to: r.meetiLocations.meetiId
    }),
    category: r.one.category({
      from: r.meeti.categoryId,
      to: r.category.id,
      optional: false
    }),
    community: r.one.community({
      from: r.meeti.communityId,
      to: r.community.id,
      optional: false
    }),
    admin: r.one.users({
      from: r.meeti.createdBy,
      to: r.users.id,
      optional: false
    })
  }
}));