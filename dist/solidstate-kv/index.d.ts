export default SolidState;
declare function SolidState(config: any): {
    version: string;
    persister: any;
    getter: any;
    post: (doc: any) => Promise<any>;
    put: (id: any, update: any) => Promise<any>;
    patch: (id: any, update: any) => Promise<any>;
    get: (id: any, shape: any) => Promise<any>;
    getAll: () => Promise<any>;
    delete: (id: any, update: any) => Promise<any>;
    clear: () => Promise<any>;
};
