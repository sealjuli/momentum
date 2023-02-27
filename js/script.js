console.log("Итого 150");

console.log("1. Часы и календарь +15");
console.log("2. Приветствие +10");
console.log("3. Смена фонового изображения +20");
console.log("4. Виджет погоды +15");
console.log("5. Виджет цитата дня +10");
console.log("6. Аудиоплеер +15");
console.log("7. Продвинутый аудиоплеер (реализуется без использования библиотек) +20");
console.log("8. Перевод приложения на два языка (en/ru или en/be) +15");
console.log("9. Получение фонового изображения от API +10");
console.log("10. Настройки приложения +20");


import playList from "./playList.js";
import "../node_modules/i18next/i18next.js";
//import "../i18next/i18next.js";

i18next.init({
  lng: "en",
  resources: {
    en: {
      translation: {
        night: "Good night",
        morning: "Good morning",
        afternoon: "Good afternoon",
        evening: "Good evening",
        placeholder: "[Enter name]",
        city: "[Enter city]",
        minsk: "Minsk",
        wind: "Wind speed",
        m_s: "m/s",
        humidity: "Humidity",
        error: "Error! city not found for ",
        settings: "Settings",
        language: "Select language",
        language_ru: "Russian",
        language_en: "English",
        photo_source: "Select photo source",
        display: "Display on page",
        time: "Time",
        date: "Date",
        greeting: "Greeting",
        quote: "Quote",
        weather: "Weather",
        audio_player: "Audio-player",
        tag: "Enter tags. For example "
      },
    },
    ru: {
      translation: {
        night: "Доброй ночи",
        morning: "Доброе утро",
        afternoon: "Добрый день",
        evening: "Добрый вечер",
        placeholder: "[Введите имя]",
        city: "[Введите город]",
        minsk: "Минск",
        wind: "Скорость ветра",
        m_s: "м/с",
        humidity: "Влажность",
        error: "Ошибка! Город не найден по запросу ",
        settings: "Настройки",
        language: "Выберите язык",
        language_ru: "Русский",
        language_en: "Английский",
        photo_source: "Выберите источник фото",
        display: "Отображение на странице",
        time: "Время",
        date: "Дата",
        greeting: "Приветствие",
        quote: "Цитата",
        weather: "Погода",
        audio_player: "Аудиоплеер",
        tag: "Введите теги. Например, "
      },
    },
  },
});

const time = document.querySelector(".time");
const dateElem = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const inputName = document.querySelector(".name");
const body = document.querySelector("body");
const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");
const city = document.querySelector(".city");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const changeQuoteButton = document.querySelector(".change-quote");
const playBtn = document.querySelector(".play");
const playPrevBtn = document.querySelector(".play-prev");
const playNextBtn = document.querySelector(".play-next");
const playListContainer = document.querySelector(".play-list");
const settingsIcon = document.querySelector(".settings-icon");
const settings = document.querySelector(".settings");
const settingsIconClose = document.querySelector(".settings-icon-close");
const settingsClose = document.querySelector(".settings-close");
const settingsMenu = document.querySelector(".settings-menu");

const ruLanguageInput = document.querySelector(".ru-language-input");
const enLanguageInput = document.querySelector(".en-language-input");
const inputEn = document.querySelector(".input-en");
const inputRu = document.querySelector(".input-ru");

const settingsH2 = document.querySelector(".settings-h2");
const select_language = document.querySelector(".select-language");
const select_source = document.querySelector(".select-source");
const displayOnPage = document.querySelector(".display-on-page");

const checkboxTime = document.querySelector(".checkbox-text-time");
const checkboxDate = document.querySelector(".checkbox-text-date");
const checkboxGreeting = document.querySelector(".checkbox-text-greeting");
const checkboxQuote = document.querySelector(".checkbox-text-quote");
const checkboxWeather = document.querySelector(".checkbox-text-weather");
const checkboxAudio = document.querySelector(".checkbox-text-audio");
const ruSpan = document.querySelector(".ru-span");
const enSpan = document.querySelector(".en-span");

const github = document.querySelector(".github");
const unsplashApi = document.querySelector(".unsplash-api");
const flickrApi = document.querySelector(".flickr-api");
const psiGithub = document.querySelector(".psi-github");
const psiUnsplash = document.querySelector(".psi-unsplash");
const psiFlickr = document.querySelector(".psi-flickr");
const tags = document.querySelector(".input-tag");

const displayTime = document.querySelector(".display-time");
const displayDate = document.querySelector(".display-date");
const displayGreeting = document.querySelector(".display-greeting");
const displayQuote = document.querySelector(".display-quote");
const displayWeather = document.querySelector(".display-weather");
const displayAudio = document.querySelector(".display-audio");

const audioName = document.querySelector(".song-name");
const currentLength = document.querySelector(".current");
const muteButton = document.querySelector(".muteButton");
const audioPlayer = document.querySelector(".player");
const audioLength = document.querySelector(".audio-length");
const soundVolume = document.querySelector(".soundVolume");

const audio = new Audio();
const date = new Date();
let randomNum = getRandomNum();
let classWeatherIcon;
let isPlay = false;
let playNum = 0;
let quotes;
let languageApp;

// city.placeholder = "[Enter sity]";
// inputName.placeholder = i18next.t("placeholder", { lng: navigator.language }); // "[Enter name]";
city.value =
  localStorage.getItem("city") || i18next.t("minsk", { lng: languageApp }); // city.value = localStorage.getItem("city") || "Minsk";
body.style.height = "100%";
body.style.backgroundPosition = "center";
body.style.backgroundRepeat = "no-repeat";
body.style.backgroundSize = "cover";
tags.value = localStorage.getItem("tags");
muteButton.style.opacity = "1";

if (localStorage.getItem('languageEn') === 'false') {
  inputRu.checked = true;
} else {
  inputEn.checked = true;
}

if (localStorage.getItem('photoSource') === 'GitHub') {
  checkGitHub();
} else if (localStorage.getItem('photoSource') === 'Unsplash') {
  checkUnsplash();
} else if (localStorage.getItem('photoSource') === 'Flickr') {
  checkFlickr();
} else {
  checkGitHub();
}

if (localStorage.getItem('displayTime') === 'false') {
  time.style.opacity = "0";
} else {
  displayTime.checked = true;
}

if (localStorage.getItem('displayDate') === 'false') {
  dateElem.style.opacity = "0";
} else {
  displayDate.checked = true;
}

if (localStorage.getItem('displayGreeting') === 'false') {
  greeting.style.opacity = "0";
  inputName.style.opacity = "0";
} else {
  displayGreeting.checked = true;
}

if (localStorage.getItem('displayQuote') === 'false') {
  quote.style.opacity = "0";
  author.style.opacity = "0";
  changeQuoteButton.style.opacity = "0";
} else {
  displayQuote.checked = true;
}

if (localStorage.getItem('displayWeather') === 'false') {
  city.style.opacity = "0";
  weatherIcon.style.opacity = "0";
  temperature.style.opacity = "0";
  weatherDescription.style.opacity = "0";
  wind.style.opacity = "0";
  humidity.style.opacity = "0";
} else {
  displayWeather.checked = true;
}

if (localStorage.getItem('displayAudioPlayer') === 'false') {
  const player = document.querySelector(".player");
  player.style.opacity = "0";
} else {
  displayAudio.checked = true;
}

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  city.placeholder = i18next.t("city", { lng: languageApp }); // "[Enter sity]";
  inputName.placeholder = i18next.t("placeholder", { lng: languageApp }); // "[Enter name]";

  // settings
  settingsH2.textContent = i18next.t("settings", { lng: languageApp });
  select_language.textContent = i18next.t("language", { lng: languageApp });
  select_source.textContent = i18next.t("photo_source", { lng: languageApp });
  displayOnPage.textContent = i18next.t("display", { lng: languageApp });
  checkboxTime.textContent = i18next.t("time", { lng: languageApp });
  checkboxDate.textContent = i18next.t("date", { lng: languageApp });
  checkboxGreeting.textContent = i18next.t("greeting", { lng: languageApp });
  checkboxQuote.textContent = i18next.t("quote", { lng: languageApp });
  checkboxWeather.textContent = i18next.t("weather", { lng: languageApp });
  checkboxAudio.textContent = i18next.t("audio_player", { lng: languageApp });
  ruSpan.textContent = i18next.t("language_ru", { lng: languageApp });
  enSpan.textContent = i18next.t("language_en", { lng: languageApp });
  languageApp = inputEn.checked ? "en" : "ru";

  currentLength.textContent = getTimeCodeFromNum(Math.round(audio.currentTime * 100) / 100);

  showDate();
  showGreeting();
  checkDuration();
  getWeather();
  changeQuotesLang();
  setTimeout(showTime, 1000); // рекурсивный setTimeout — вызов функции внутри неё самой с интервалом в 1 секунду или 1000 миллисекунд.
}

function showDate() {
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  dateElem.textContent = date.toLocaleDateString(languageApp, options); // 'ru-RU', 'en-US', 'en-Br'
}

// Функция, возвращающую время суток (morning, afternoon, evening, night) в зависимости от текущего времени в часах
function getTimeOfDay(hours) {
  if ((hours >= 0) & (hours < 6)) {
    return "night";
  } else if ((hours >= 6) & (hours < 12)) {
    return "morning";
  } else if ((hours >= 12) & (hours < 18)) {
    return "afternoon";
  } else {
    return "evening";
  }
}

function showGreeting() {
  const hours = date.getHours();
  const timeOfDay = getTimeOfDay(hours);
  //const greetingText = `Good ${timeOfDay}`;
  const greetingText = i18next.t(timeOfDay, { lng: languageApp });
  greeting.textContent = greetingText;
  tags.placeholder = i18next.t("tag", { lng: languageApp }) + timeOfDay;
}

showTime();

// При перезагрузке страницы приложения имя пользователя сохраняется
function setLocalStorage() {
  localStorage.setItem("name", inputName.value);
  localStorage.setItem("city", city.value);
}

window.addEventListener("beforeunload", setLocalStorage);

// перед загрузкой страницы (событие load) данные нужно восстановить и отобразить
function getLocalStorage() {
  if (localStorage.getItem("name")) {
    inputName.value = localStorage.getItem("name");
  } else {
    inputName.placeholder = i18next.t("placeholder", {
      lng: languageApp,
    }); // "[Enter name]";




  }
}

window.addEventListener("load", getLocalStorage);

// Чтобы увидеть сохранённые в браузере данные localStorage, на странице приложения нажмите клавишу F12,
// на панели devTools вверху выберите пункт Application, на боковой панели пункт Local Storage и ссылку на страницу приложения.

// 3. Смена фонового изображения

function getRandomNum() {
  return Math.floor(Math.random() * 19 + 1);
}

function setBgGithub() {
  const hours = date.getHours();
  let timeOfDay = getTimeOfDay(hours);
  let bgNum = randomNum.toString();
  // Чтобы избежать моментов, когда фоновое изображение ещё не загрузилось,
  // но уже используется как фоновое, необходимо указывать его фоном страницы только после полной загрузки.
  const img = new Image();
  img.src =
    "https://raw.githubusercontent.com/sealjuli/stage1-tasks/assets/images/" +
    timeOfDay +
    "/" +
    bgNum.padStart(2, "0") +
    ".jpg";
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
}

// setBgGithub();

// увеличивает рандомное число на 1 пока результат не станет равным 20.
// Если результат сложения равен 20, следующему за ним числу присваиваете значение 1.
function getSlideNext() {
  if (psiGithub.checked) {
    if (randomNum === 20) {
      randomNum = 1;
    } else {
      randomNum += 1;
    }
    setBgGithub();
  }

  if (psiFlickr.checked) {
    setBgFlickr();
  }

  if (psiUnsplash.checked) {
    setBgUnsplash();
  }
}

slideNext.addEventListener("click", getSlideNext);

// уменьшаете рандомное число на единицу, пока оно больше 1.
// Если результат вычитания равен 1, следующему за ним числу присваиваете значение 20.
// Внутри этих функций вызываете функцию setBg(), обновляющую фоновое изображение.
function getSlidePrev() {
  if (psiGithub.checked) {
    if (randomNum === 1) {
      randomNum = 20;
    } else {
      randomNum -= 1;
    }
    setBgGithub();
  }

  if (psiFlickr.checked) {
    setBgFlickr();
  }

  if (psiUnsplash.checked) {
    setBgUnsplash();
  }
}

slidePrev.addEventListener("click", getSlidePrev);

// 4. Виджет погоды

async function getWeather() {
  const error = document.querySelector(".weather-error");
  const city = document.querySelector(".city");
  if (city.value) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${languageApp}&appid=70ee5a925dddf0f39291dca9e0d1b64d&units=metric`; // units=imperial lang=en
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod != 404) {
      error.textContent = null;
      weatherIcon.className = "weather-icon owf";
      classWeatherIcon = `owf-${data.weather[0].id}`;
      weatherIcon.classList.add(classWeatherIcon);
      temperature.textContent = `${Math.floor(data.main.temp)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      wind.textContent = `${i18next.t("wind", {
        lng: languageApp,
      })}: ${Math.floor(data.wind.speed)} ${i18next.t("m_s", {
        lng: languageApp,
      })}`;
      humidity.textContent = `${i18next.t("humidity", {
        lng: languageApp,
      })}: ${Math.floor(data.main.humidity)}%`;
    } else {
      error.textContent = `${i18next.t("error", { lng: languageApp })} ${city.value
        }!`;
      weatherIcon.classList.remove(classWeatherIcon);
      weatherIcon.classList.remove("weather-icon");
      weatherIcon.classList.remove("owf");
      temperature.textContent = null;
      weatherDescription.textContent = null;
      wind.textContent = null;
      humidity.textContent = null;
    }
  } else {
    error.textContent = null;
    weatherIcon.classList.remove(classWeatherIcon);
    weatherIcon.classList.remove("weather-icon");
    weatherIcon.classList.remove("owf");
    temperature.textContent = null;
    weatherDescription.textContent = null;
    wind.textContent = null;
    humidity.textContent = null;
  }
}

getWeather();

city.addEventListener("change", getWeather);

// 5. Виджет цитата дня

async function getQuotes() {
  let randomNum;
  if (localStorage.getItem("quoteNum")) {
    if (+localStorage.getItem("quoteNum") === 19) {
      randomNum = 0;
    } else {
      randomNum = +localStorage.getItem("quoteNum") + 1;
    }
  } else {
    randomNum = getRandomNum();
  }
  if (languageApp === "ru") {
    quotes = "js/data_ru.json";
  } else {
    quotes = "js/data.json";
  }
  const res = await fetch(quotes);
  const data = await res.json();
  quote.textContent = data[randomNum].text;
  author.textContent = data[randomNum].author;
  localStorage.setItem("quoteNum", randomNum);
}

getQuotes();

async function changeQuotesLang() {
  if ((languageApp === "ru") & (quotes === "js/data.json")) {
    quotes = "js/data_ru.json";
    const res = await fetch(quotes);
    const data = await res.json();
    if (localStorage.getItem("quoteNum")) {
      quote.textContent = data[localStorage.getItem("quoteNum")].text;
      author.textContent = data[localStorage.getItem("quoteNum")].author;
    }
  }

  if ((languageApp === "en") & (quotes === "js/data_ru.json")) {
    quotes = "js/data.json";
    const res = await fetch(quotes);
    const data = await res.json();
    if (localStorage.getItem("quoteNum")) {
      quote.textContent = data[localStorage.getItem("quoteNum")].text;
      author.textContent = data[localStorage.getItem("quoteNum")].author;
    }
  }
}

changeQuoteButton.addEventListener("click", getQuotes);

// 6. Аудиоплеер
audioName.textContent = playList[0].title;

function playAudio() {
  let minutes;
  let seconds;
  let playPlaylist = document.querySelectorAll(".play-playlist");
  if (!isPlay) {
    if (localStorage.getItem("audioNum")) {
      playNum = +localStorage.getItem("audioNum");
    } else {
      playNum = playNum;
    }
    let playItems = document.querySelectorAll(".play-item");
    playItems.forEach((el) => {
      if (el.textContent === playList[playNum].title) {
        el.classList.add("item-active");
      } else {
        el.classList.remove("item-active");
      }
    });
    isPlay = true;
    audio.src = playList[playNum].src; // ссылка на аудио-файл;
    audioName.textContent = playList[playNum].title;
    if (localStorage.getItem("currentTime")) {
      minutes = localStorage.getItem("currentTime").substring(0, 1);
      seconds = localStorage.getItem("currentTime").substring(2, 4);
      audio.currentTime = minutes * 60 + seconds;
    } else {
      audio.currentTime = 0;
    }
    audio.play();
    playBtn.classList.add("pause");

    playPlaylist.forEach((el) => {
      if (el.classList.contains("number" + playNum)) {
        el.classList.add("pause");
      };
    });
    localStorage.setItem("audioNum", playNum);
  } else {
    playPlaylist.forEach((el) => {
      el.classList.remove("pause");
    });
    isPlay = false;
    audio.pause();
    playBtn.classList.remove("pause");
  }
}

playBtn.addEventListener("click", playAudio);

function playNext() {
  let playPlaylist = document.querySelectorAll(".play-playlist");
  playPlaylist.forEach((el) => {
    el.classList.remove("pause");
  });
  currentLength.textContent = getTimeCodeFromNum(0);
  if (playNum === 3) {
    playNum = 0;
  } else {
    playNum += 1;
  }
  localStorage.setItem("audioNum", playNum);
  isPlay = false;
  playAudio();
  audio.currentTime = 0;
}

function playPrev() {
  let playPlaylist = document.querySelectorAll(".play-playlist");
  playPlaylist.forEach((el) => {
    if (el.classList.contains("pause")) {
      el.classList.remove("pause");
    };
  });
  currentLength.textContent = getTimeCodeFromNum(0);
  if (playNum === 0) {
    playNum = 3;
  } else {
    playNum -= 1;
  }
  localStorage.setItem("audioNum", playNum);
  isPlay = false;
  playAudio();
  audio.currentTime = 0;
}

playPrevBtn.addEventListener("click", playPrev);

playNextBtn.addEventListener("click", playNext);

let audioCount = 0;


const playAudioByNum = (event) => {
  let playPlaylist = document.querySelectorAll(".play-playlist");
  let audioNum = event.target.classList[2].substr(-1);
  let playItems = document.querySelectorAll(".play-item");
  playItems.forEach((el) => {
    if (el.textContent === playList[audioNum].title) {
      el.classList.add("item-active");
    } else {
      el.classList.remove("item-active");
    }
  });
  if (!event.target.classList.contains("pause")) {
    playPlaylist.forEach((el) => {
      if (el.classList.contains("pause")) {
        el.classList.remove("pause");
      };
    });
    isPlay = true;
    audio.src = playList[audioNum].src;
    audioName.textContent = playList[audioNum].title;
    /*
    if (localStorage.getItem("currentTime")) {
      minutes = localStorage.getItem("currentTime").substring(0, 1);
      seconds = localStorage.getItem("currentTime").substring(2, 4);
      audio.currentTime = minutes * 60 + seconds;
    } else {
      audio.currentTime = 0;
    }*/
    audio.play();
    playBtn.classList.add("pause");
    event.target.classList.add("pause");
    localStorage.setItem("audioNum", audioNum);
  } else {
    isPlay = false;
    audio.pause();
    playBtn.classList.remove("pause");
    event.target.classList.remove("pause");
  }
};

// сгенерировать плейлист
playList.forEach((el) => {
  const li = document.createElement("li");
  const playButton = document.createElement("button");
  playButton.classList.add("play-playlist");
  playButton.classList.add("player-icon");
  playButton.classList.add("number" + audioCount);
  playButton.addEventListener("click", playAudioByNum);
  li.classList.add("play-item");
  li.textContent = el.title;
  li.append(playButton);
  playListContainer.append(li);
  audioCount += 1;
});

function checkDuration() {
  let currDuration = playList[playNum].duration;
  let minutes = +currDuration.substring(0, 2);
  let seconds = +currDuration.substring(3, 5);
  if (Math.floor(audio.currentTime) === minutes * 60 + seconds) {
    playNext();
  }
}

// 9. Получение фонового изображения от API

async function setBgFlickr() {
  let randomNum = Math.floor(Math.random() * 99 + 1);
  let hours = date.getHours();
  let timeOfDay = getTimeOfDay(hours);
  let tagsValue = tags.value || timeOfDay;

  const flickrUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=98f39e05aec55da657880f42191a1649&tags=${tagsValue}&tag_mode=all&extras=url_l&format=json&nojsoncallback=1`;
  // tags=nature - запрос, по которым ищем фото
  // extras=url_h - возвращать только большие (large) фото.
  const res = await fetch(flickrUrl);
  const data = await res.json();

  if (data.photos.photo[randomNum].url_l) {
    console.log(data.photos.photo[randomNum].url_l);
  } else {
    setBgFlickr();
  }
  const img = new Image();
  img.src = data.photos.photo[randomNum].url_l;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
}

async function setBgUnsplash() {
  let hours = date.getHours();
  let timeOfDay = getTimeOfDay(hours);
  let tagsValue = tags.value || timeOfDay;
  const unsplashUrl = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tagsValue}&client_id=ByRkR0LEbaFoHjXr-oOug95noZLIFUkj5TeXc14Heuk`;
  // orientation=landscape - фото вытянутое по горизонтали
  // query=nature - запрос, по которому ищем фото
  const res = await fetch(unsplashUrl);
  const data = await res.json();
  console.log(data.urls.regular);
  const img = new Image();
  img.src = data.urls.regular;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
}

// 10. Настройки приложения
function openSettings() {
  if (!settingsMenu.classList.contains("active")) {
    settingsMenu.classList.add("active");
  }
}

settings.addEventListener("click", openSettings);
settingsIcon.addEventListener("click", openSettings);

function closeSettings() {
  if (settingsMenu.classList.contains("active")) {
    settingsMenu.classList.remove("active");
  }
}

settingsClose.addEventListener("click", closeSettings);
settingsIconClose.addEventListener("click", closeSettings);

function changeLanguageRu() {
  inputRu.checked = true;
  languageApp = "ru";
  localStorage.setItem("languageEn", inputEn.checked);
  showTime();
}

function changeLanguageEn() {
  inputEn.checked = true;
  languageApp = "en";
  localStorage.setItem("languageEn", inputEn.checked);
  showTime();
}

ruLanguageInput.addEventListener("click", changeLanguageRu);
inputRu.addEventListener("click", changeLanguageRu);
enLanguageInput.addEventListener("click", changeLanguageEn);
inputEn.addEventListener("click", changeLanguageEn);

function checkGitHub() {
  psiGithub.checked = true;
  localStorage.setItem("photoSource", 'Github');
  setBgGithub();
}

function checkUnsplash() {
  psiUnsplash.checked = true;
  localStorage.setItem("photoSource", 'Unsplash');
  setBgUnsplash();
}

function checkFlickr() {
  psiFlickr.checked = true;
  localStorage.setItem("photoSource", 'Flickr');
  setBgFlickr();
}

github.addEventListener("click", checkGitHub);
psiGithub.addEventListener("click", checkGitHub);

unsplashApi.addEventListener("click", checkUnsplash);
psiUnsplash.addEventListener("click", checkUnsplash);

flickrApi.addEventListener("click", checkFlickr);
psiFlickr.addEventListener("click", checkFlickr);

// если источником получения фото указан API, в настройках приложения можно указать тег/теги, для которых API будет присылает фото

function changeTag() {
  localStorage.setItem("tags", tags.value);
  if (psiUnsplash.checked) {
    setBgUnsplash();
  }

  if (psiFlickr.checked) {
    setBgFlickr();
  }
}

tags.addEventListener("change", changeTag);

// в настройках приложения можно скрыть/отобразить любой из блоков, которые находятся на странице: время, дата, приветствие, цитата дня,
// прогноз погоды, аудиоплеер, список дел/список ссылок/ваш собственный дополнительный функционал +3
function displayElementTime() {
  localStorage.setItem("displayTime", displayTime.checked);
  time.style.transition = "2s";
  if (displayTime.checked) {
    time.style.opacity = "1";
  } else {
    time.style.opacity = "0";
  }
}

function displayElementDate() {
  localStorage.setItem("displayDate", displayDate.checked);
  dateElem.style.transition = "2s";
  if (displayDate.checked) {
    dateElem.style.opacity = "1";
  } else {
    dateElem.style.opacity = "0";
  }
}

function displayElementGreeting() {
  localStorage.setItem("displayGreeting", displayGreeting.checked);
  greeting.style.transition = "2s";
  inputName.style.transition = "2s";
  if (displayGreeting.checked) {
    greeting.style.opacity = "1";
    inputName.style.opacity = "1";
  } else {
    greeting.style.opacity = "0";
    inputName.style.opacity = "0";
  }
}

function displayElementQuote() {
  localStorage.setItem("displayQuote", displayQuote.checked);
  author.style.transition = "2s";
  quote.style.transition = "2s";
  changeQuoteButton.style.transition = "2s";
  if (displayQuote.checked) {
    quote.style.opacity = "1";
    author.style.opacity = "1";
    changeQuoteButton.style.opacity = "1";
  } else {
    quote.style.opacity = "0";
    author.style.opacity = "0";
    changeQuoteButton.style.opacity = "0";
  }
}

function displayElementWeather() {
  localStorage.setItem("displayWeather", displayWeather.checked);
  city.style.transition = "2s";
  weatherIcon.style.transition = "2s";
  temperature.style.transition = "2s";
  weatherDescription.style.transition = "2s";
  wind.style.transition = "2s";
  humidity.style.transition = "2s";

  if (displayWeather.checked) {
    city.style.opacity = "1";
    weatherIcon.style.opacity = "1";
    temperature.style.opacity = "1";
    weatherDescription.style.opacity = "1";
    wind.style.opacity = "1";
    humidity.style.opacity = "1";
  } else {
    city.style.opacity = "0";
    weatherIcon.style.opacity = "0";
    temperature.style.opacity = "0";
    weatherDescription.style.opacity = "0";
    wind.style.opacity = "0";
    humidity.style.opacity = "0";
  }
}

displayTime.addEventListener('change', displayElementTime);
displayDate.addEventListener('change', displayElementDate);
displayGreeting.addEventListener('change', displayElementGreeting);
displayQuote.addEventListener('change', displayElementQuote);
displayWeather.addEventListener('change', displayElementWeather);
displayAudio.addEventListener('change', displayElementAudioPlayer);

// 7. Продвинутый аудиоплеер
audio.addEventListener("loadeddata",
  () => {

    audioLength.textContent = getTimeCodeFromNum(audio.duration);
    audio.volume = .75;
  },
  false
);

//click on timeline to skip around
const timeline = audioPlayer.querySelector(".timeline");
timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
}, false);

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

// В прогресс-баре отображается прогресс проигрывания
setInterval(() => {
  const progressBar = audioPlayer.querySelector(".progress");
  progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
  currentLength.textContent = getTimeCodeFromNum(audio.currentTime);
  localStorage.setItem("currentTime", currentLength.textContent);
}, 500);

function muteSound() {
  if (muteButton.style.opacity === "1") {
    muteButton.style.opacity = "0.4"
    soundVolume.value = 0;
    audio.volume = 0;
  } else {
    muteButton.style.opacity = "1";
    soundVolume.value = 0.5;
    audio.volume = 0.5;
  }
}

muteButton.addEventListener("click", muteSound);

function changeSoundVolume() {
  audio.volume = soundVolume.value;
}

soundVolume.addEventListener("change", changeSoundVolume);

function displayElementAudioPlayer() {
  const player = document.querySelector(".player");
  localStorage.setItem("displayAudioPlayer", displayAudio.checked);
  player.style.transition = "2s";
  if (displayAudio.checked) {
    player.style.opacity = "1";
  } else {
    player.style.opacity = "0";
  }
}