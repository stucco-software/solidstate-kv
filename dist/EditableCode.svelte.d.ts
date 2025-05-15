/** @typedef {typeof __propDef.props}  EditableCodeProps */
/** @typedef {typeof __propDef.events}  EditableCodeEvents */
/** @typedef {typeof __propDef.slots}  EditableCodeSlots */
export default class EditableCode extends SvelteComponentTyped<{
    src: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type EditableCodeProps = typeof __propDef.props;
export type EditableCodeEvents = typeof __propDef.events;
export type EditableCodeSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        src: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
