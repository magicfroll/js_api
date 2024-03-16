const slides = document.querySelectorAll('.slides img');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function showSlide(index) {
    // Сбрасываем у всех картинок и навигационных точек класс 'active'
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    // Добавляем класс 'active' к картинкам и точкам, соответвующим переданному индексу
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function goToSlide(index) {
  showSlide(index);
  currentSlide = index;
}

document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    goToSlide(index);
  });
});

showSlide(currentSlide);