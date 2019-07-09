import { ConstructorFor, AnyFunc, PlainObject } from 'simplytyped'; // tslint:disable-line:no-implicit-dependencies

const specialProps = new Map([
    ['class', 'className'],
    ['for', 'htmlFor'],
]);

type ConstructorForRenderObject = ConstructorFor<{ render: Function }>;

type CreateElementName = string | AnyFunc | ConstructorForRenderObject;

type ElementFactory = [
    (x: CreateElementName) => boolean,
    ((x: CreateElementName, props: PlainObject) => HTMLElement)
];

const createFactories: ElementFactory[] = [
    [x => typeof x === 'function' && x.prototype && 'render' in x.prototype, (x, props) => {
        return new (x as ConstructorForRenderObject)(props).render();
    }],
    [x => typeof x === 'function', (x, props) => (x as AnyFunc)(props)],
    [x => typeof x === 'string', (x) => document.createElement(x as string)],
];

export function createElement(name: CreateElementName, props: PlainObject, ...children: Node[]): HTMLElement {
    const factory = createFactories.find(([match]) => match(name));
    if (!factory) {
        throw new Error(`Expected string, function or class, but given ${name}`);
    }
    const [, create] = factory;
    const element = create(name, props);
    if (props != null) {
        for (let [name, value] of Object.entries(props)) {
            if (name.startsWith('on')) {
                name = name.toLowerCase();
            }
            name = specialProps.get(name) || name;
            element[name] = value;
        }
    }
    element.append(...children);
    return element;
}

export function Fragment({ children }: any) { // tslint:disable-line:function-name
    return children;
}

export const h = createElement;
