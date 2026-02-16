export interface Config {
    componentDir: string;
    registry: string;
}

export interface RegistryItem {
    name: string;
    files: Array<{
        path: string;
        content: string;
        type: string;
    }>;
    dependencies?: string[];
}