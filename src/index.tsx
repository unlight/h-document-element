import { ConstructorFor, AnyFunc, PlainObject } from 'simplytyped';

type ConstructorForComponent = ConstructorFor<{ render: Function }>;

type CreateElementName = string | AnyFunc | ConstructorForComponent;

type ElementFactory = {
    match(x: CreateElementName): boolean;
    get(x: CreateElementName, props: PlainObject, children: CreateElementChildren[]): HTMLElement;
};

type CreateElementChildren = Node | string;

const specialProps = new Map([
    ['class', 'className'],
    ['for', 'htmlFor'],
]);

const elementFactories: ElementFactory[] = [
    {
        match: x => (typeof x === 'function' && x.prototype && 'render' in x.prototype),
        get: (x, props, children) => {
            return new (x as ConstructorForComponent)({ ...props, children }).render();
        }
    },
    {
        match: x => x === Fragment,
        get: (x, props, children) => {
            const fragment = document.createDocumentFragment();
            fragment.append(...children.flat());
            return fragment;
        },
    },
    {
        match: x => typeof x === 'function',
        get: (x, props, children) => {
            return (x as AnyFunc)({ ...props, children });
        }
    },
    {
        match: x => typeof x === 'string',
        get: (x, props, children) => {
            const element = document.createElement(x as string);
            for (let [name, value] of Object.entries(props || {})) {
                if (name.startsWith('on')) {
                    name = name.toLowerCase();
                } else if (specialProps.has(name)) {
                    name = specialProps.get(name)!; // tslint:disable-line:no-non-null-assertion
                }
                element[name] = value;
            }
            element.append(...children.flat());
            return element;
        }
    },
    {
        match: x => { throw new Error(`Expected string, function or class, but given ${x}`); },
        get: () => undefined,
    },
];

export function createElement(name: CreateElementName, props: PlainObject, ...children: CreateElementChildren[]): HTMLElement {
    return elementFactories.find(({ match }) => match(name))! // tslint:disable-line:no-non-null-assertion
        .get(name, props, children);
}

export function Fragment() { // tslint:disable-line:function-name
}

export const h = createElement;
