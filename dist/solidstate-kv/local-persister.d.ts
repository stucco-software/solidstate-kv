export default localPersister;
declare function localPersister(): "Filesystem in Node" | "In-Memory, non peristent" | {
    persist: ({ ins, del }: {
        ins: any;
        del: any;
    }) => Promise<void>;
    getter: (query: any) => Promise<any>;
};
