// Ф-я, которая принимает максимальную цену и скрывает все элементы с ценой выше указанного значения

const filterElementsByDataAttribute = (attributeName, maxPrice) => {
    const elements = Array.from(document.querySelectorAll(`[${attributeName}]`));
    elements.forEach(element => {
        const price = parseFloat(element.getAttribute(attributeName));
        if (price > maxPrice) {
            element.style.display = 'none';
        }
    });
}

filterElementsByDataAttribute('data-price', 50);

const sortElementsByDataAttribute = attributeName => {
    const rating = document.querySelector('.rating');
    const elements = Array.from(rating.querySelectorAll(`[${attributeName}]`));
    elements.sort((a, b) => {
        const ratingA = parseInt(a.getAttribute(attributeName));
        const ratingB = parseInt(b.getAttribute(attributeName));
        return ratingB - ratingA;  
    });
    elements.forEach(element => {
        rating.appendChild(element);
    });
}

sortElementsByDataAttribute('data-rating');