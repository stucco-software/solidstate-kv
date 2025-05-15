export function post(persist: any, getter: any): (doc: any) => Promise<any>;
export function put(persist: any, getter: any): (id: any, update: any) => Promise<any>;
export function patch(persist: any, getter: any): (id: any, update: any) => Promise<any>;
export function deleteStatements(persist: any, getter: any): (id: any, update: any) => Promise<any>;
export function getEntity(getter: any): (id: any, shape: any) => Promise<any>;
export function getAll(getter: any): () => Promise<any>;
export function clear(persist: any): () => Promise<any>;
