export interface DatabaseError {
  readonly code: string;
  readonly detail: string;
  readonly table: string;
}
