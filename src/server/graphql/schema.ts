import { builder } from "./builder";

// Import all type definitions
import "./types/user";
import "./types/post";

// Build and export the schema
export const schema = builder.toSchema();
