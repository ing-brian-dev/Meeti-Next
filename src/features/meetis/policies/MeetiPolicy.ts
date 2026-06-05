import { User } from "better-auth"
import { SelectMeeti } from "../types/meeti.types"

export class MeetiPolicy {
  static isAdmin(user: User, meeti: SelectMeeti) : boolean {
    return user.id === meeti.createdBy
  }

  static canViewAttendes(user: User, meeti: SelectMeeti) : boolean {
    return this.isAdmin(user, meeti)
  }

  static canEdit(user: User, meeti: SelectMeeti) : boolean {
    return this.isAdmin(user, meeti)
  }

  static canDelete(user: User, meeti: SelectMeeti) : boolean {
    return this.isAdmin(user, meeti)
  }

  static isPastMeeti(meeti: SelectMeeti): boolean {
    const now = new Date();
    const meetiDateTime = new Date(`${meeti.date}T${meeti.time}`);
    return meetiDateTime < now;
  }
}