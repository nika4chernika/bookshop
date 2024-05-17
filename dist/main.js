/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _indexSlider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./indexSlider */ \"./src/indexSlider.js\");\n// document.write('Hello, world!');\r\n// import './css/style.css'\r\n\r\n\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", function () {\r\n  // функции смены контента\r\n  const dotOne = document.querySelector(\".dot-one\");\r\n  const dotTwo = document.querySelector(\".dot-two\");\r\n  const dotThree = document.querySelector(\".dot-three\");\r\n  const coverSlide = document.querySelector(\".cover-slide\");\r\n  const buttonBuy = document.querySelectorAll(\".book-button-buy\");\r\n\r\n  let toSlideOne = function () {\r\n    coverSlide.innerHTML = \"\";\r\n    coverSlide.innerHTML = `<img src=\"./images/banner1.png\" alt=\"black friday sale up to 60%\" class=\"slide-one-img\">`;\r\n    dotOne.classList.add(\"dot-active\");\r\n    dotTwo.classList.remove(\"dot-active\");\r\n    dotThree.classList.remove(\"dot-active\");\r\n  };\r\n\r\n  let toSlideTwo = function () {\r\n    coverSlide.innerHTML = \"\";\r\n    coverSlide.innerHTML = `<img src=\"./images/banner2.png\" alt=\"top 10 books for entrepreneurs\" class=\"slide-two-img\">`;\r\n    dotOne.classList.remove(\"dot-active\");\r\n    dotTwo.classList.add(\"dot-active\");\r\n    dotThree.classList.remove(\"dot-active\");\r\n  };\r\n\r\n  let toSlideThree = function () {\r\n    coverSlide.innerHTML = \"\";\r\n    coverSlide.innerHTML = `<img src=\"./images/banner3.png\" alt=\"check out our cozy books selection\" class=\"slide-three-img\">`;\r\n    dotOne.classList.remove(\"dot-active\");\r\n    dotTwo.classList.remove(\"dot-active\");\r\n    dotThree.classList.add(\"dot-active\");\r\n  };\r\n\r\n  dotOne.addEventListener(\"click\", () => {\r\n    toSlideOne();\r\n  });\r\n\r\n  dotTwo.addEventListener(\"click\", () => {\r\n    toSlideTwo();\r\n  });\r\n\r\n  dotThree.addEventListener(\"click\", () => {\r\n    toSlideThree();\r\n  });\r\n\r\n  // таймер\r\n  let currentIndex = 0;\r\n\r\n  setInterval(function () {\r\n    if (currentIndex === 0) {\r\n      currentIndex = 1;\r\n      return toSlideTwo();\r\n    }\r\n    if (currentIndex === 1) {\r\n      currentIndex = 2;\r\n      return toSlideThree();\r\n    }\r\n    if (currentIndex === 2) {\r\n      currentIndex = 0;\r\n      return toSlideOne();\r\n    }\r\n  }, 5000);\r\n\r\n\r\n  let n = 0 // индекс загрузки книг\r\n  const bookShop = document.querySelector(\".book-cards\");\r\n\r\n  // api запрос\r\n  function booksLoader(method, url) {\r\n    return new Promise((resolve, reject) => {\r\n      let xhr = new XMLHttpRequest();\r\n      xhr.open(method, url);\r\n      xhr.responseType = \"json\";\r\n      xhr.onload = () => {\r\n        if (xhr.status >= 400) {\r\n          reject(xhr.response);\r\n        } else {\r\n          resolve(xhr.response);\r\n          // console.log('obj', xhr.response);\r\n        }\r\n      };\r\n      xhr.onerror = function () {\r\n        console.log(\"Ошибка! Статус ответа: \", xhr.status);\r\n      };\r\n      xhr.send();\r\n    });\r\n  }\r\n\r\n  // вывод карточки книг\r\n  booksLoader(\"GET\", `https://www.googleapis.com/books/v1/volumes?q=\"subject:Business\"&key=AIzaSyB3-xzhbt50GBJeIpqK7Q7wd9iaUoag9Yg&printType=books&startIndex=${n}&maxResults=6&langRestrict=en`)\r\n    .then((apiData) => {\r\n      bookShop.innerHTML = addBookInfo(apiData);\r\n      apiData.items.forEach((item, index) => {\r\n        showReviewStars(index, apiData);\r\n      });\r\n      attachEventListenersToBuyButtons();\r\n    })\r\n    .catch((error) => {\r\n      console.error(error);\r\n    });\r\n\r\n\r\n  // функции для вывода инфы из обьекта в карточку книги\r\n  function showReviewText(i, apiData) {\r\n    let reviewNum = \"\";\r\n    if (apiData.items[i].volumeInfo.ratingCount == undefined) {\r\n      reviewNum = \"0\";\r\n    } else {\r\n      reviewNum += `${apiData.items[i].volumeInfo.ratingsCount}`;\r\n    }\r\n    return reviewNum;\r\n  }\r\n\r\n  function showReviewStars(i, apiData) {\r\n    const percent = apiData.items[i].volumeInfo.averageRating ;\r\n    console.log(percent)\r\n    const starsBg = document.getElementById(`stars-bg-${i}`); // Обращаемся к уникальному ID\r\n    starsBg.style.width = `${percent}%`;\r\n  }\r\n\r\n  function showDescription(i, apiData) {\r\n    let descriptText = \"\";\r\n    if (apiData.items[i].volumeInfo.description == undefined) {\r\n      descriptText += \"Description not found\";\r\n    } else {\r\n      descriptText += `${apiData.items[i].volumeInfo.description}`;\r\n    }\r\n    return descriptText;\r\n  }\r\n\r\n  // function showPrice(i, apiData) {\r\n  //   let bookPrice = \"\";\r\n  //   if (apiData.items[i].saleInfo.retailPrice == undefined) {\r\n  //     bookPrice += \"For free\";\r\n  //   } else {\r\n  //     rubToDollar = +apiData.items[i].saleInfo.retailPrice.amount / 94;\r\n  //     bookPrice += `&#36; ${rubToDollar.toFixed(2)}`;\r\n  //   }\r\n  //   return bookPrice;\r\n  // }\r\n\r\n  function addBookInfo(apiData) {\r\n    let books = \"\";\r\n    for (let i = 0; i < apiData.items.length; i++) {\r\n      books += `\r\n        <div class=\"book\">\r\n            <div class=\"book-img\">\r\n                <div class=\"book-shadow\"></div>\r\n                <img src=\"${\r\n                  apiData.items[i].volumeInfo.imageLinks.thumbnail\r\n                }\" alt=\"imgBook\" class=\"book-img-content\"/>\r\n            </div>\r\n            <div class=\"book-specification\">\r\n                <div class=\"book-info\">\r\n                    <p class=\"book-author\">${\r\n                      apiData.items[i].volumeInfo.authors[0]\r\n                    }</p>\r\n                    <h2 class=\"book-name\">${\r\n                      apiData.items[i].volumeInfo.title\r\n                    }</h3>\r\n                    <div class=\"review\">\r\n                    <div class=\"review-rating\">\r\n                    <div class=\"stars-bg\" id=\"stars-bg-${i}\"></div>\r\n                    <img src=\"./images/stars.svg\" alt=\"stars\" class=\"rating-stars\">\r\n                </div>\r\n                        <p class=\"review-text\">${showReviewText(\r\n                          i,\r\n                          apiData\r\n                        )} review</p>\r\n                    </div>\r\n                </div>\r\n                <p class=\"book-description\">${showDescription(i, apiData)}</p>\r\n                <h3 class=\"book-price\">${(0,_indexSlider__WEBPACK_IMPORTED_MODULE_0__.showPrice)(i, apiData)}</h3>\r\n                \r\n                <button class=\"book-button-buy\">Buy now</button>\r\n            </div>\r\n        </div>`;\r\n    }\r\n    return books;\r\n  }\r\n\r\n  // подгрузить книги\r\n  fetch(`https://www.googleapis.com/books/v1/volumes?q=\"subject:Business\"&key=AIzaSyB3-xzhbt50GBJeIpqK7Q7wd9iaUoag9Yg&printType=books&startIndex=${n}&maxResults=6&langRestrict=en`) \r\n    .then(response => response.json())\r\n    .then(data => {\r\n      const apiData = data;\r\n      const loadMoreBooks = document.querySelector('.load-more-button');\r\n      loadMoreBooks.addEventListener('click', () => {\r\n        n += 6;\r\n        fetch(`https://www.googleapis.com/books/v1/volumes?q=\"subject:Business\"&key=AIzaSyB3-xzhbt50GBJeIpqK7Q7wd9iaUoag9Yg&printType=books&startIndex=${n}&maxResults=6&langRestrict=en`)\r\n          .then(response => response.json())\r\n          .then(data => {\r\n                  const moreApiData = data;\r\n                  const newDiv = document.createElement('div');\r\n                  newDiv.className = 'book-cards-new';\r\n                  bookShop.append(newDiv);\r\n                  newDiv.innerHTML = `${addBookInfo(moreApiData, n)}`;\r\n                  attachEventListenersToBuyButtons();\r\n                })\r\n        })\r\n    .catch(error => console.error('Ошибка при получении данных из API:', error));\r\n    })\r\n\r\n  // добавить в корзину\r\n  const cartInfo = document.querySelector(\".header-icon__cart-info\");\r\n  const infoNumber = document.querySelector(\".cart-info-text\");\r\n\r\n  let count = 0;\r\n\r\n  function attachEventListenersToBuyButtons() {\r\n    const buttonBuy = document.querySelectorAll(\".book-button-buy\");\r\n    buttonBuy.forEach((button) => {\r\n      button.addEventListener(\"click\", function () {\r\n        count += 1;\r\n        infoNumber.innerHTML = `${count}`;\r\n        cartInfo.style.display = \"flex\";\r\n        this.classList.add(\"book-button-in-the-cart\");\r\n        console.log(\"Item added to cart\");\r\n        // localStorage\r\n        localStorage.setItem(\"cart\", JSON.stringify(someName)); // new\r\n        const someName = JSON.parse(localStorage.getItem()) // new\r\n      });\r\n    });\r\n  }\r\n  \r\n  // //apiData.items[i].volumeInfo.categories\r\n  function changeCategory() {\r\n    let categoryListIndex = 0\r\n    const categoryList = document.querySelectorAll('.genre-text');\r\n    console.log('obj', categoryList)\r\n    const booksCategoty = {\r\n      0: \"Architecture\",\r\n      1: \"Art & Fashion\",\r\n      2: \"Biography\",\r\n      3: \"Business\",\r\n      4: \"Crafts & Hobbies\",\r\n      5: \"Drama\",\r\n      6: \"Fiction\",\r\n      7:\"Food & Drink\",\r\n      8: \"Health & Wellbeing\",\r\n      9: \"History & Politics\",\r\n      10: \"Humor\",\r\n      11: \"Poetry\",\r\n      12: \"Psychology\",\r\n      13: \"Sience\",\r\n      14: \"Technology\",\r\n      15: \"Travel & Maps\",\r\n    };\r\n    for (var i = 0; i < categoryList.length; i++) {\r\n      categoryList[i].addEventListener(\"click\", function () {\r\n        for (var i = 0; i < categoryList.length; i++) {\r\n          categoryList[i].classList.remove(\"genre-active\");\r\n        }\r\n        this.classList.add('genre-active')\r\n        console.log('klicked')\r\n      })\r\n      \r\n    }\r\n  }\r\n  changeCategory()\r\n\r\n  \r\n\r\n});\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://bookshop/./src/index.js?");

/***/ }),

/***/ "./src/indexSlider.js":
/*!****************************!*\
  !*** ./src/indexSlider.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   showPrice: () => (/* binding */ showPrice)\n/* harmony export */ });\nfunction showPrice(i, apiData) {\n    let bookPrice = \"\";\n    if (apiData.items[i].saleInfo.retailPrice == undefined) {\n      bookPrice += \"For free\";\n    } else {\n      rubToDollar = +apiData.items[i].saleInfo.retailPrice.amount / 94;\n      bookPrice += `&#36; ${rubToDollar.toFixed(2)}`;\n    }\n    return bookPrice;\n  }\n\n  \n\n//# sourceURL=webpack://bookshop/./src/indexSlider.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;