import { notifications } from "@/src/db/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type SelectNotification = InferSelectModel<typeof notifications>
export type InsertNotification = InferInsertModel<typeof notifications>