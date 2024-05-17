
document.addEventListener("DOMContentLoaded", function () {
  // слайдер
  const dotOne = document.querySelector(".dot-one");
  const dotTwo = document.querySelector(".dot-two");
  const dotThree = document.querySelector(".dot-three");
  const coverSlide = document.querySelector(".cover-slide");

  let toSlideOne = function () {
    coverSlide.innerHTML = "";
    coverSlide.innerHTML = `<img src="./images/banner1.png" alt="black friday sale up to 60%" class="slide-one-img">`;
    dotOne.classList.add("dot-active");
    dotTwo.classList.remove("dot-active");
    dotThree.classList.remove("dot-active");
  };

  let toSlideTwo = function () {
    coverSlide.innerHTML = "";
    coverSlide.innerHTML = `<img src="./images/banner2.png" alt="top 10 books for entrepreneurs" class="slide-two-img">`;
    dotOne.classList.remove("dot-active");
    dotTwo.classList.add("dot-active");
    dotThree.classList.remove("dot-active");
  };

  let toSlideThree = function () {
    coverSlide.innerHTML = "";
    coverSlide.innerHTML = `<img src="./images/banner3.png" alt="check out our cozy books selection" class="slide-three-img">`;
    dotOne.classList.remove("dot-active");
    dotTwo.classList.remove("dot-active");
    dotThree.classList.add("dot-active");
  };

  dotOne.addEventListener("click", () => {
    toSlideOne();
  });

  dotTwo.addEventListener("click", () => {
    toSlideTwo();
  });

  dotThree.addEventListener("click", () => {
    toSlideThree();
  });

  let currentCategory = 'Architecture'
  let allBooks = []
  let cart = JSON.parse(localStorage.getItem("cart" ) ?? "[]") 

    // таймер
  let currentIndex = 0;
  setInterval(function () {
    if (currentIndex === 0) {
      currentIndex = 1;
      return toSlideTwo();
    }
    if (currentIndex === 1) {
      currentIndex = 2;
      return toSlideThree();
    }
    if (currentIndex === 2) {
      currentIndex = 0;
      return toSlideOne();
    }
  }, 5000);


  let n = 0 // индекс загрузки книг
  const bookShop = document.querySelector(".book-cards");

  // api запрос
  function booksLoader(method, url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.responseType = "json";
      xhr.onload = () => {
        if (xhr.status >= 400) {
          reject(xhr.response);
        } else {
          resolve(xhr.response);
        }
      };
      xhr.onerror = function () {
        console.log("Ошибка! Статус ответа: ", xhr.status);
      };
      xhr.send();
    });
  }

  // вывод карточки книг
  booksLoader("GET", `https://www.googleapis.com/books/v1/volumes?q="subject:${currentCategory}"&key=AIzaSyB3-xzhbt50GBJeIpqK7Q7wd9iaUoag9Yg&printType=books&startIndex=${n}&maxResults=6&langRestrict=en`)
    .then((apiData) => {
      allBooks = apiData.items
      bookShop.innerHTML = addBookInfo(apiData);
      console.log(allBooks)
      apiData.items.forEach((item, index) => {
        showReviewStars(index, apiData);
      });
      attachEventListenersToBuyButtons();
    })
    .catch((error) => {
      console.error(error);
    });


  // функции для вывода инфы из обьекта в карточку книги
  function showReviewText(i, apiData) {
    let reviewNum = "";
    if (apiData.items[i].volumeInfo.ratingCount == undefined) {
      reviewNum = "0";
    } else {
      reviewNum += `${apiData.items[i].volumeInfo.ratingsCount}`;
    }
    return reviewNum;
  }

  function showReviewStars(i, apiData) {
    const percent = apiData.items[i].volumeInfo.averageRating ;
    console.log(percent)
    const starsBg = document.getElementById(`stars-bg-${i}`); 
    starsBg.style.width = `${percent}%`;
  }

  function showDescription(i, apiData) {
    let descriptText = "";
    if (apiData.items[i].volumeInfo.description == undefined) {
      descriptText += "Description not found";
    } else {
      descriptText += `${apiData.items[i].volumeInfo.description}`;
    }
    return descriptText;
  }

  function showPrice(i, apiData) {
    let bookPrice = "";
    if (apiData.items[i].saleInfo.retailPrice == undefined) {
      bookPrice += "For free";
    } else {
      rubToDollar = +apiData.items[i].saleInfo.retailPrice.amount / 94;
      bookPrice += `&#36; ${rubToDollar.toFixed(2)}`;
    }
    return bookPrice;
  }

  function addBookInfo(apiData) {
    let books = "";
    for (let i = 0; i < apiData.items.length; i++) {
      books += `
        <div class="book">
            <div class="book-img">
                <div class="book-shadow"></div>
                <img src="${
                  apiData.items[i].volumeInfo.imageLinks.thumbnail
                }" alt="imgBook" class="book-img-content"/>
            </div>
            <div class="book-specification">
                <div class="book-info">
                    <p class="book-author">${
                      apiData.items[i].volumeInfo.authors[0]
                    }</p>
                    <h2 class="book-name">${
                      apiData.items[i].volumeInfo.title
                    }</h3>
                    <div class="review">
                    <div class="review-rating">
                    <div class="stars-bg" id="stars-bg-${i}"></div>
                    <img src="./images/stars.svg" alt="stars" class="rating-stars">
                </div>
                        <p class="review-text">${showReviewText(
                          i,
                          apiData
                        )} review</p>
                    </div>
                </div>
                <p class="book-description">${showDescription(i, apiData)}</p>
                <h3 class="book-price">${showPrice(i, apiData)}</h3>
                
                <button class="book-button-buy">Buy now</button>
            </div>
        </div>`;
    }
    return books;
  }

  // подгрузить книги
  const loadMoreBooks = document.querySelector('.load-more-button');
      loadMoreBooks.addEventListener('click', () => {
        n += 6;
        fetch(`https://www.googleapis.com/books/v1/volumes?q="subject:${currentCategory}"&key=AIzaSyB3-xzhbt50GBJeIpqK7Q7wd9iaUoag9Yg&printType=books&startIndex=${n}&maxResults=6&langRestrict=en`)
          .then(response => response.json())
          .then(data => {
                  const moreApiData = data;
                  allBooks.push(...moreApiData.items)
                  const newDiv = document.createElement('div');
                  newDiv.className = 'book-cards-new';
                  bookShop.append(newDiv);
                  newDiv.innerHTML = `${addBookInfo(moreApiData, n)}`;
                  attachEventListenersToBuyButtons();
                })
                console.log(allBooks)
        })
   

  // добавить в корзину
  const cartInfo = document.querySelector(".header-icon__cart-info");
  const infoNumber = document.querySelector(".cart-info-text");

  function attachEventListenersToBuyButtons() {
    const buttonBuy = document.querySelectorAll(".book-button-buy");
    buttonBuy.forEach((button, index) => {
      button.addEventListener("click", function () {
        if(cart.some(book => book.id === allBooks[index].id)) {
          cart = cart.filter(book => book.id != allBooks[index].id)
        } else { 
          cart.push(allBooks[index])
        }
        infoNumber.innerHTML = cart.length;
        cartInfo.style.display = "flex";
        this.classList.add("book-button-in-the-cart");
        console.log(cart);
        localStorage.setItem("cart", JSON.stringify(cart))
      });
    });
  }

  // смена категории
  function getCategorybooks (category) {
    currentCategory = category
    booksLoader("GET", `https://www.googleapis.com/books/v1/volumes?q="subject:${category}"&key=AIzaSyB3-xzhbt50GBJeIpqK7Q7wd9iaUoag9Yg&printType=books&startIndex=${n}&maxResults=6&langRestrict=en`)
    .then((apiData) => {
      bookShop.innerHTML = addBookInfo(apiData);
      apiData.items.forEach((item, index) => {
        showReviewStars(index, apiData);
      });
      attachEventListenersToBuyButtons();
    })
    .catch((error) => {
      console.error(error);
    });
  }
  
  function changeCategory() {
    const categoryList = document.querySelectorAll('.genre-text');
    console.log('obj', categoryList)
    categoryList.forEach(category => {
      category.addEventListener('click', () => getCategorybooks(category.textContent))
    })
  }
  changeCategory()
});



