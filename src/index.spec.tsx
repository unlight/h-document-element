/* eslint-disable @typescript-eslint/tslint/config */
import { createElement, Fragment } from '.';

it('smoke', () => {
    expect(createElement).toBeTruthy();
});

it('render simple html tag', () => {
    expect((<div />).outerHTML).toBe('<div></div>');
});

it('one attribute', () => {
    expect((<div id="A" />).outerHTML).toBe('<div id="A"></div>');
});

it('class attribute', () => {
    expect((<p class="C" />).outerHTML).toBe('<p class="C"></p>');
});

it('multiple attributes', () => {
    expect((<div id="A" tabIndex={1} />).outerHTML).toBe('<div id="A" tabindex="1"></div>');
});

it('event onclick', () => {
    const click = jest.fn();
    const element = <div onClick={click} />;
    element.click();
    expect(click).toHaveBeenCalled();
});

it('children', () => {
    expect((<p>{'hello'}</p>).outerHTML).toBe('<p>hello</p>');
});

it('children nested', () => {
    expect(
        (
            <div>
                {'foo'}
                <p>{'bar'}</p>
            </div>
        ).outerHTML,
    ).toBe('<div>foo<p>bar</p></div>');
});

it('children more nested', () => {
    expect(
        (
            <div>
                {'foo'}
                <p>
                    {'bar'}
                    <a>A</a>
                </p>
            </div>
        ).outerHTML,
    ).toBe('<div>foo<p>bar<a>A</a></p></div>');
});

it('functional component', () => {
    const TestComponent = () => <p></p>;
    expect(
        (
            <div>
                <TestComponent />
            </div>
        ).outerHTML,
    ).toBe('<div><p></p></div>');
});

it('functional component with props', () => {});

it('class component', () => {
    class TestComponent {
        props: any;
        render() {
            return <p></p>;
        }
    }
    expect(
        (
            <div>
                <TestComponent />
            </div>
        ).outerHTML,
    ).toBe('<div><p></p></div>');
});

it('class component with props', () => {
    class TestComponent {
        constructor(public props) {}
        render() {
            return (
                <p>
                    {this.props.string}
                    {this.props.number}
                </p>
            );
        }
    }
    expect((<TestComponent string={'S'} number={1} />).outerHTML).toBe('<p>S1</p>');
});

it('create unknown factory', () => {
    expect(() => {
        createElement(null as any, null as any);
    }).toThrow('Expected string, function or class');
});

it('child with functional children components', () => {
    const S = (props: any) => {
        return <s>{props.children}R</s>;
    };
    const T = (props: any) => {
        return <S>L{props.children}</S>;
    };
    expect((<T>A</T>).outerHTML).toBe('<s>LAR</s>');
});

it('fragment as child', () => {
    expect(
        (
            <div>
                <Fragment>
                    <p />
                    <b />
                </Fragment>
            </div>
        ).outerHTML,
    ).toBe('<div><p></p><b></b></div>');
});

it('fragment as child with functional components', () => {
    const Em = ({ children }: any) => <em>{children}</em>;
    expect(
        (
            <div>
                <Fragment>
                    <Em>A</Em>
                    <Em>{'B'}</Em>
                </Fragment>
            </div>
        ).outerHTML,
    ).toBe('<div><em>A</em><em>B</em></div>');
});

it('fragment one child', () => {
    const fragment: DocumentFragment = (
        <Fragment>
            <p>
                F<s />
            </p>
        </Fragment>
    );
    const element = document.createElement('main');
    element.append(fragment);
    expect(element.innerHTML).toBe('<p>F<s></s></p>');
});

it.skip('is attribute', () => {
    customElements.define('custom-a', class CustomAnchorElement extends HTMLAnchorElement {});
    expect((<a is="custom-anchor" />).outerHTML).toBe('<a is="custom-anchor"></a>');
});
