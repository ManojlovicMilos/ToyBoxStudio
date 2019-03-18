export type RootState = {
    version: string;
    cliVersion: string;
    project: Object,
    projectExists: boolean;
    editors: any[],
    [key: string]: any;
}