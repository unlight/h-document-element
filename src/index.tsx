import { ConstructorFor, AnyFunc, PlainObject } from 'simplytyped';

type ConstructorForComponent = ConstructorFor<{ render: Function }>;

type CreateElementName = string | AnyFunc | ConstructorForComponent;

type ElementFactory = {
    match(x: CreateElementName): boolean;
    get(x: CreateElementName, props: PlainObject): HTMLElement;
};

type CreateElementChildren = Node | string;

const specialProps = new Map([
    ['class', 'className'],
    ['for', 'htmlFor'],
]);

const elementFactories: ElementFactory[] = [
    {
        match: x => typeof x === 'function' && x.prototype && 'render' in x.prototype,
        get: (x, props) => new (x as ConstructorForComponent)(props).render(),
    },
    {
        match: x => typeof x === 'function',
        get: (x, props) => (x as AnyFunc)(props),
    },
    {
        match: x => typeof x === 'string',
        get: (x) => document.createElement(x as string),
    },
    {
        match: x => { throw new Error(`Expected string, function or class, but given ${x}`); },
        get: () => undefined,
    },
];

export function createElement(name: CreateElementName, props: PlainObject, ...children: CreateElementChildren[]): HTMLElement {
    const element = elementFactories.find(({ match }) => match(name))!.get(name, props); // tslint:disable-line:no-non-null-assertion
    for (let [name, value] of Object.entries(props || {})) {
        if (name.startsWith('on')) {
            name = name.toLowerCase();
        } else if (specialProps.has(name)) {
            name = specialProps.get(name)!; // tslint:disable-line:no-non-null-assertion
        }
        element[name] = value;
    }
    element.append(...children);
    return element;
}

export function Fragment() { // tslint:disable-line:function-name
    throw new Error('<Fragment> is not supported');
}

export const h = createElement;
