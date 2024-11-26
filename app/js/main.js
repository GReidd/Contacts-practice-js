/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/graph-modal/src/graph-modal.js":
/*!*****************************************************!*\
  !*** ./node_modules/graph-modal/src/graph-modal.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GraphModal)
/* harmony export */ });
class GraphModal {
  constructor(options) {
    let defaultOptions = {
      isOpen: () => {},
      isClose: () => {},
    }
    this.options = Object.assign(defaultOptions, options);
    this.modal = document.querySelector('.graph-modal');
    this.speed = 300;
    this.animation = 'fade';
    this._reOpen = false;
    this._nextContainer = false;
    this.modalContainer = false;
    this.isOpen = false;
    this.previousActiveElement = false;
    this._focusElements = [
      'a[href]',
      'input',
      'select',
      'textarea',
      'button',
      'iframe',
      '[contenteditable]',
      '[tabindex]:not([tabindex^="-"])'
    ];
    this._fixBlocks = document.querySelectorAll('.fix-block');
    this.events();
  }

  events() {
    if (this.modal) {
      document.addEventListener('click', function (e) {
        const clickedElement = e.target.closest(`[data-graph-path]`);
        if (clickedElement) {
          let target = clickedElement.dataset.graphPath;
          let animation = clickedElement.dataset.graphAnimation;
          let speed = clickedElement.dataset.graphSpeed;
          this.animation = animation ? animation : 'fade';
          this.speed = speed ? parseInt(speed) : 300;
          this._nextContainer = document.querySelector(`[data-graph-target="${target}"]`);
          this.open();
          return;
        }

        if (e.target.closest('.js-modal-close')) {
          this.close();
          return;
        }
      }.bind(this));

      window.addEventListener('keydown', function (e) {
        if (e.keyCode == 27 && this.isOpen) {
          this.close();
        }

        if (e.which == 9 && this.isOpen) {
          this.focusCatch(e);
          return;
        }
      }.bind(this));

      document.addEventListener('click', function (e) {
        if (e.target.classList.contains('graph-modal') && e.target.classList.contains("is-open")) {
          this.close();
        }
      }.bind(this));
    }

  }

  open(selector) {
    this.previousActiveElement = document.activeElement;

    if (this.isOpen) {
      this.reOpen = true;
      this.close();
      return;
    }

    this.modalContainer = this._nextContainer;

    if (selector) {
      this.modalContainer = document.querySelector(`[data-graph-target="${selector}"]`);
    }
    
    this.modalContainer.scrollTo(0, 0)

    this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`);
    this.modal.classList.add('is-open');

    document.body.style.scrollBehavior = 'auto';
    document.documentElement.style.scrollBehavior = 'auto';

    this.disableScroll();

    this.modalContainer.classList.add('graph-modal-open');
    this.modalContainer.classList.add(this.animation);

    setTimeout(() => {
      this.options.isOpen(this);
      this.modalContainer.classList.add('animate-open');
      this.isOpen = true;
      this.focusTrap();
    }, this.speed);
  }

  close() {
    if (this.modalContainer) {
      this.modalContainer.classList.remove('animate-open');
      this.modalContainer.classList.remove(this.animation);
      this.modal.classList.remove('is-open');
      this.modalContainer.classList.remove('graph-modal-open');

      this.enableScroll();

      document.body.style.scrollBehavior = 'auto';
      document.documentElement.style.scrollBehavior = 'auto';

      this.options.isClose(this);
      this.isOpen = false;
      this.focusTrap();

      if (this.reOpen) {
        this.reOpen = false;
        this.open();
      }
    }
  }

  focusCatch(e) {
    const nodes = this.modalContainer.querySelectorAll(this._focusElements);
    const nodesArray = Array.prototype.slice.call(nodes);
    const focusedItemIndex = nodesArray.indexOf(document.activeElement)
    if (e.shiftKey && focusedItemIndex === 0) {
      nodesArray[nodesArray.length - 1].focus();
      e.preventDefault();
    }
    if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
      nodesArray[0].focus();
      e.preventDefault();
    }
  }

  focusTrap() {
    const nodes = this.modalContainer.querySelectorAll(this._focusElements);
    if (this.isOpen) {
      if (nodes.length) nodes[0].focus();
    } else {
      this.previousActiveElement.focus();
    }
  }

  disableScroll() {
    let pagePosition = window.scrollY;
    this.lockPadding();
    document.body.classList.add('disable-scroll');
    document.body.dataset.position = pagePosition;
    document.body.style.top = -pagePosition + 'px';
  }

  enableScroll() {
    let pagePosition = parseInt(document.body.dataset.position, 10);
    this.unlockPadding();
    document.body.style.top = 'auto';
    document.body.classList.remove('disable-scroll');
    window.scrollTo({
      top: pagePosition,
      left: 0
    });
    document.body.removeAttribute('data-position');
  }

  lockPadding() {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    this._fixBlocks.forEach((el) => {
      el.style.paddingRight = paddingOffset;
    });
    document.body.style.paddingRight = paddingOffset;
  }

  unlockPadding() {
    this._fixBlocks.forEach((el) => {
      el.style.paddingRight = '0px';
    });
    document.body.style.paddingRight = '0px';
  }
}


/***/ }),

/***/ "./src/js/_components.js":
/*!*******************************!*\
  !*** ./src/js/_components.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/modal.js */ "./src/js/components/modal.js");
/* harmony import */ var _components_addCard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/addCard.js */ "./src/js/components/addCard.js");



/***/ }),

/***/ "./src/js/components/addCard.js":
/*!**************************************!*\
  !*** ./src/js/components/addCard.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
function sortContacts() {
  const cardsContainer = document.querySelector('.cards');
  const cards = Array.from(cardsContainer.children);
  cards.sort((a, b) => {
    const aFavorite = a.classList.contains('favorite') ? 1 : 0;
    const bFavorite = b.classList.contains('favorite') ? 1 : 0;
    if (aFavorite !== bFavorite) {
      return bFavorite - aFavorite; // Избранные выше
    }
    const aName = a.querySelector('.card__name').textContent.trim();
    const bName = b.querySelector('.card__name').textContent.trim();
    return aName.localeCompare(bName); // Сортировка по алфавиту
  });
  cards.forEach(card => cardsContainer.appendChild(card)); // Перестановка карточек
}
document.querySelector('.cards').addEventListener('click', e => {
  if (e.target.closest('.card__favorite')) {
    e.preventDefault();
    const card = e.target.closest('.card');
    card.classList.toggle('favorite'); // Переключение избранного
    sortContacts(); // Пересортировка
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const nameField = document.getElementById("nameField");
  const phoneField = document.getElementById("phoneField");

  // Маска для телефона
  phoneField.addEventListener("input", () => {
    let value = phoneField.value.replace(/\D/g, "");
    if (value.length > 1) value = "+" + value;
    if (value.length > 4) value = value.slice(0, 2) + " (" + value.slice(2);
    if (value.length > 8) value = value.slice(0, 7) + ") " + value.slice(7);
    if (value.length > 13) value = value.slice(0, 12) + "-" + value.slice(12);
    if (value.length > 16) value = value.slice(0, 15) + "-" + value.slice(15);
    phoneField.value = value;
  });

  // Проверка имени
  const validateName = () => {
    if (nameField.value.trim() === "") {
      nameField.style.border = "1px solid red";
      return false;
    } else {
      nameField.style.border = "";
      return true;
    }
  };

  // Проверка телефона
  const validatePhone = () => {
    if (phoneField.value.length < 18) {
      phoneField.style.border = "1px solid red";
      return false;
    } else {
      phoneField.style.border = "";
      return true;
    }
  };

  // Добавление контакта
  const addContact = (name, phone, isFavorite) => {
    const cardsContainer = document.querySelector('.cards');
    const card = document.createElement('div');
    card.className = 'card';
    if (isFavorite) {
      card.classList.add('favorite'); // Добавляем класс избранного
    }
    card.innerHTML = `
    <img src="img/card-img.jpg" alt="User Image" class="card-img">
      <div class="card__content">
        <h2 class="card__name">${name}</h2>
        <a href="tel:${phone}" class="card__phone">${phone}</a>
      </div>
      <div class="card__action">
        <a href="#" class="card__delete">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M21.7776 14.976L28.5756 8.18396C30.4512 6.31196 30.4512 3.26406 28.5756 1.39206C26.6976 -0.491935 23.6544 -0.491935 21.7776 1.39206L14.9808 8.18396L8.18403 1.39206C6.30843 -0.491935 3.26523 -0.491935 1.38723 1.39206C-0.48837 3.26406 -0.48837 6.31196 1.38723 8.18396L8.18403 14.976L1.38723 21.7801C-0.48837 23.6521 -0.48837 26.7001 1.38723 28.5721C3.26523 30.4561 6.30843 30.4561 8.18403 28.5721L14.9808 21.7801L21.7776 28.5721C23.6544 30.4561 26.6976 30.4561 28.5756 28.5721C30.4512 26.7001 30.4512 23.6521 28.5756 21.7801L21.7776 14.976Z"
              fill="black" />
          </svg>
        </a>
        <a href="#" class="card__favorite">
          <svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M17 6.00031C14.001 2.50527 8.98962 1.42516 5.23205 4.62556C1.47447 7.82596 0.94545 13.1768 3.8963 16.962C6.34973 20.109 13.7747 26.7465 16.2082 28.8948C16.4803 29.1352 16.6165 29.2553 16.7753 29.3025C16.9138 29.3437 17.0655 29.3437 17.2042 29.3025C17.363 29.2553 17.499 29.1352 17.7713 28.8948C20.2048 26.7465 27.6297 20.109 30.0832 16.962C33.034 13.1768 32.5695 7.79229 28.7473 4.62556C24.9252 1.45882 19.999 2.50527 17 6.00031Z"
              stroke="black" stroke-width="3.84" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
  `;
    cardsContainer.appendChild(card); // Добавляем карточку

    sortContacts(); // Пересортировка карточек
  };

  // Обработчик отправки формы
  form.addEventListener("submit", event => {
    event.preventDefault();
    const isNameValid = validateName();
    const isPhoneValid = validatePhone();
    const isFavorite = document.querySelector('.custom-checkbox__field').checked;
    if (isNameValid && isPhoneValid) {
      const name = nameField.value.trim();
      const phone = phoneField.value.trim();
      addContact(name, phone, isFavorite);
      alert("Контакт добавлен!");
      form.reset();
    }
  });
});

/***/ }),

/***/ "./src/js/components/modal.js":
/*!************************************!*\
  !*** ./src/js/components/modal.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var graph_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graph-modal */ "./node_modules/graph-modal/src/graph-modal.js");

const modal = new graph_modal__WEBPACK_IMPORTED_MODULE_0__["default"]();

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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_components.js */ "./src/js/_components.js");

})();

/******/ })()
;
//# sourceMappingURL=main.js.map