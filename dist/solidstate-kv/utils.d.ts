export const context: {
    "@base": string;
    "@vocab": string;
};
export function contextualize(doc: any): any;
export function compact(doc: any): Promise<any>;
export function toTriples(doc: any): Promise<any>;
export function castLiteral(type: any, lit: any): any;
export function typeValue(o: any): any;
export function arrayify(target: any): any[];
