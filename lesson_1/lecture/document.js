console.log('First Child');
console.log(document.body.firstChild);

console.log('Last Child');
console.log(document.body.lastChild);

console.log('Child Node');
console.log(document.body.childNodes);

console.log('Children');
console.log(document.body.children);

console.log('***');

console.log('Работа со свойствами и коллекциями HTML'); 

// Чтобы работать как с массивом - Array.from()

// Для перебора изпользовать цикл for(..of..)

for(let val of document.body.children) {
    console.log(val);
}

console.log('***');

for(let val of document.body.children) {
    console.log(val.localName === 'div' ? 'This is DIV' : 'This is NOT DIV');
}

console.log('***');
for(let val of document.body.children) {
    console.log(`--------${val.localName}--------`);
    console.log(val.firstElementChild);
    console.log(val.lastElementChild);
    console.log(val.previousElementSibling);
    console.log(val.nextElementSibling);
    console.log(val.parentElement);
}

// ДОСТУП К СОДЕРЖИМОМУ ТЕКСТОВОГО УЗЛА
console.log('ДОСТУП К СОДЕРЖИМОМУ ТЕКСТОВОГО УЗЛА');

for(let val of document.body.childNodes) {
    console.log(val.nodeValue); // или val.data
}

// classList 
// .add
// .remove
// .contains
// .toggle удалит класс при его наличии, а при отсутствии добавит


// innerHTML позволяет изменить полностью разметку всего элемента

// CLOSEST AND MATCHES

console.log('CLOSEST AND MATCHES');

for(let val of document.body.children) {
    if(val.matches('script[defer')) console.log('our script is deferred');
}

let grandChild = document.querySelector('.grandchild');
console.log(grandChild.closest('.span'));
console.log(grandChild.closest('body'));
console.log(grandChild.closest('last'));

// СОЗДАНИЕ И ВСТАВКА

console.log('СОЗДАНИЕ И ВСТАВКА');

// ● document.createTextNode(‘текст’) — создаёт текстовый узел.
// ● document.createElement('body') — создаёт элемент.


// ● node.prepend(...узлы или строки) — вставляет узлы или строки в начало node.
// ● node.append(...узлы или строки) — добавляет узлы или строки в конец node.
// ● node.before(...узлы или строки) — вставляет узлы или строки до node.
// ● node.after(...узлы или строки) — вставляет узлы или строки после node.
// ● node.replaceWith(...узлы или строки) — заменяет node заданными узлами или
// строками.

// element.insertAdjacentHTML(куда, html).

// ● beforebegin — вставить html непосредственно перед element.
// ● afterbegin — вставить html в начало element.
// ● beforeend — вставить html в конец element.
// ● afterend — вставить html непосредственно после element.

// ● element.insertAdjacentText(куда, текст) — вставляет текст.
// ● element.insertAdjacentElement(куда, Элемент) — вставляет элемент Элемент.

// node.remove()

// element.cloneNode(глубоко).

let div = document.createElement('div');
div.innerHTML = '<strong>Всем привет!</strong> Я новенький элемент!';
document.body.append(div);
let div2 = div.cloneNode(true);
div2.innerHTML += ' Второй';
setTimeout(() => div.insertAdjacentElement('afterend', div2), 1000);
setTimeout(() => div.remove(), 2000);

