/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

"use strict";

const movieDB = {
  movies: [
    "Логан",
    "Лига справедливости",
    "Ла-ла лэнд",
    "Одержимость",
    "Скотт Пилигрим против...",
  ],
};

let adv = document.querySelectorAll(".promo__adv img");
adv.forEach((item) => {
  item.remove();
});

let genre = document.querySelector(".promo__genre");
let poster = document.querySelector(".promo__bg");
let movieList = document.querySelector(".promo__interactive-list");
let addForm = document.querySelector(".add");
let addInput = document.querySelector(".adding__input");
let checkBox = document.querySelector("[type='checkbox']");

genre.textContent = "драма";
poster.style.cssText = "background-image: url('./img/bg.jpg');";
movieDB.movies.sort();

function addFilmOnPage(films, parent) {
  parent.innerHTML = "";
  films.forEach((item, i) => {
    parent.innerHTML += `
    <li class="promo__interactive-item">
                ${i + 1}. ${item}
                <div class="delete"></div>
    </li>`;
  });

  document.querySelectorAll(".delete").forEach((btn, i) => {
    btn.addEventListener("click", () => {
      btn.parentElement.remove();
      movieDB.movies.splice(i, 1);
      addFilmOnPage(films, parent);
    });
  });
}
addFilmOnPage(movieDB.movies, movieList);

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (addInput.value) {
    if (addInput.value.length > 21) {
      addInput.value = `${addInput.value.slice(0, 21)}...`;
    }
    movieDB.movies.push(addInput.value);
    movieDB.movies.sort();
    addFilmOnPage(movieDB.movies, movieList);
  }

  e.target.reset();
});
