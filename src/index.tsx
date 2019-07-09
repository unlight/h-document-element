const specialProps = new Map([
    ['class', 'className'],
    ['for', 'htmlFor'],
]);

const elementFactories: any[] = [
    [x => typeof x === 'function' && x.prototype && 'render' in x.prototype, (x, props) => new x(props).render()],
    [x => typeof x === 'function', (x, props) => x(props)],
    [x => typeof x === 'string', (x) => document.createElement(x)],
    [() => true, undefined],
];

export function createElement(name: any, props: any, ...children: any[]): HTMLElement {
    const [, elementFactory] = elementFactories.find(([test]) => test(name));
    if (elementFactory == null) {
        throw new Error(`Expected string, function or class, but given ${name}`);
    }
    const element = elementFactory(name, props);
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

export function Fragment({ children }: any) {
    return children;
}

export const h = createElement;
