export function getMarkdownMeta(): Promise<any[]>;
export function getGraph(): Promise<{
    "@context": {
        "@base": string;
        "@vocab": string;
        id: string;
        type: string;
        Origin: string;
        Octothorpe: string;
        verified: string;
        challenge: string;
        octothorpes: {
            "@id": string;
            "@type": string;
        };
        octothorpedBy: {
            "@reverse": string;
        };
        hasPart: {
            "@id": string;
            "@type": string;
        };
        next: {
            "@id": string;
            "@type": string;
        };
        partOf: {
            "@reverse": string;
        };
        prefLabel: string;
        draft: string;
    };
    "@graph": any[];
}>;
export function getFrame(query: any): Promise<any>;
