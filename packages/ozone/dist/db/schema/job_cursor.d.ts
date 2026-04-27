import { Generated } from 'kysely';
export declare const jobCursorTableName = "job_cursor";
export interface JobCursor {
    job: string;
    cursor: string | null;
    updatedAt: Generated<string>;
}
export type PartialDB = {
    [jobCursorTableName]: JobCursor;
};
//# sourceMappingURL=job_cursor.d.ts.map