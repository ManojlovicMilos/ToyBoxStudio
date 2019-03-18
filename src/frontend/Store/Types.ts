export type RootState = {
    version: string;
    cliVersion: string;
    project: Object,
    projectExists: boolean;
    [key: string]: any;
}