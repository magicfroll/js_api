"use strict";

let table = document.getElementsByTagName('table')[0];
console.log(table);
let sel;

table.onclick = (event) => {
    let target = event.target.closest('td');
    console.log(target);
    if (!target) return console.log('!taget');
    selection(target);
}

const selection = (node) => {
    if (sel) sel.classList.remove('selection');
    sel = node;
    sel.classList.add('selection');
}