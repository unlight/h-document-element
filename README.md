# h-document-element
Create html elements from jsx/tsx syntax

## Usage
```json
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "createElement"
  }
}
```

JSX/TSX code:
```ts
import { createElement } from 'h-document-element';

document.body.appendChild(
  <div>
    <div id="greet" />
    <button onClick={() => alert('Hi!')}>Say</button>
  </div>
);
```

Equivalent plain JavaScript code
```js
const divGreetElement = document.createElement('div');
divGreetElement.id = 'greet';
const buttonElement = document.createElement('button');
buttonElement.onclick = () => alert('Hi!');
buttonElement.append('Say');
const divElement = document.createElement('div');
divElement.append(divGreetElement, buttonElement);
document.body.appendChild(divElement);
```

## Browser Support
Only modern browsers are supported:
* Chrome 69
* Edge 76
* Firefox 62
* Opera 56
* Safari 12

If you need IE, you need polyfill for:
* [Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries#Polyfill)
* [ParentNode.append()](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append#Polyfill)
* [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
* [Array.flat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)

## Similar Projects
- https://github.com/LeDDGroup/tsx-create-html-element
- https://github.com/Lusito/tsx-dom
