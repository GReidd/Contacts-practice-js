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

  cards.forEach((card) => cardsContainer.appendChild(card)); // Перестановка карточек
}

document.querySelector('.cards').addEventListener('click', (e) => {
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
  form.addEventListener("submit", (event) => {
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
