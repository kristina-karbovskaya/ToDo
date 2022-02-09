const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body: 'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.'
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body: 'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.'
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body: 'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.'
  }
];
// ----------------------------------------------------

// -----------------------------------------------------
(function (arrOfTasks) {
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  const themes = {
    default: {
      '--background': '#fff',
      '--base-text-color': '#212529',
      '--header-bg': '#007bff',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#007bff',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#0069d9',
      '--default-btn-border-color': '#0069d9',
      '--danger-btn-bg': '#dc3545',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#bd2130',
      '--danger-btn-border-color': '#dc3545',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#80bdff',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)'
    },
    dark: {
      '--background': '#000000d6',
      '--base-text-color': '#212529',
      '--header-bg': '#131416',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#58616b',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#292d31',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#b52d3a',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#88222c',
      '--danger-btn-border-color': '#88222c',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#73787C',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)'
    },
    light: {
      '--background': 'linear-gradient(42deg, #FFB2CCA9, #AED6FF9D)',
      '--base-text-color': '#212529',
      '--header-bg': '#fcf8ff',
      '--header-text-color': '#212529',
      '--default-btn-bg': '#fff',
      '--default-btn-text-color': '#212529',
      '--default-btn-hover-bg': '#e8e7e7',
      '--default-btn-border-color': '#5F1D70',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#f1b5bb',
      '--danger-btn-text-color': '#212529',
      '--danger-btn-hover-bg': '#ef808a',
      '--danger-btn-border-color': '#e2818a',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#50415F',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgb(120 75 145 / 39%)'
    }
  };
  let lastSelectedTheme = localStorage.getItem('theme') || 'default';

  //Elements UI
  const listContainer = document.querySelector(
    '.tasks-list-section .list-group'
  );
  const form = document.forms['addTask'];
  const inputTitle = form.elements['title'];
  const inputBody = form.elements['body'];
  const themeSelect = document.getElementById('themeSelect');

  // События events
  setTheme(lastSelectedTheme); // сохрн. темы
  renderAllTasks(objOfTasks);
  form.addEventListener('submit', onFormSubmitHandler);
  listContainer.addEventListener('click', onDeleteHandler); // вешаем на него, ибо разметка сделана через джс(нет точки доступа к кнопке удаления). Поэтому вешаем событие на весь список
  themeSelect.addEventListener('change', onThemeSelectHandler);

  function renderAllTasks(tasksList) {
    if (!tasksList) {
      console.error('Передайте список задач.');
      return;
    }

    const fragment = document.createDocumentFragment();
    Object.values(tasksList).forEach(task => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    });
    listContainer.appendChild(fragment);
  }

  function listItemTemplate({ _id, title, body } = {}) {
    // <--  destructuring
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'align-items-center',
      'flex-wrap',
      'mt-2'
    );

    // ДЛЯ ЛИШКИ НАВЕШИВАЕМ АТРИБУТ, ЧТОБы ПО АЙДИ УДАЛЯТЬ ТАСК
    li.setAttribute('data-task-id', _id);

    const span = document.createElement('span');
    span.textContent = title;
    span.style.fontWeight = 'bold';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');
    deleteBtn.textContent = 'Delete Task';

    const article = document.createElement('p');
    article.classList.add('mt-2', 'w-100');
    article.textContent = body;

    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(article);

    return li;
  }
  // обработчик события сабмит(кнопка добавления таска)
  function onFormSubmitHandler(e) {
    e.preventDefault(); //чтобы прекратить стандартное действие(сабмит вызывает перезагрузку стр)
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;
    // проверка, что форма не пустая: 1)(titleValue.length == 0 || bodyValue.length === 0) 2)(!titleValue || !bodyValue)
    if (titleValue.length == 0 || bodyValue.length === 0) {
      alert('Все поля должны быть заполнены');
      return; //чтобы функция дальше не выполнялась
    }

    const task = createNewTask(titleValue, bodyValue);
    // на основе одного обьекта генерируем(с пом.listItemTemplate) новую лишку
    const listItem = listItemTemplate(task);
    //добавляем задачу в дом(в одну из 4-х позиций, а именно - начало)
    listContainer.insertAdjacentElement('afterbegin', listItem);
    //сбрасывает все, как было до загрузки в форме
    form.reset();
  }

  // функ. которая будет создавать новый тааск. Вызываться будет из обработчки выше
  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false, //так как это новая задача
      _id: `task-${Math.random()}`
    };

    //добавляем в список задач. 1) Под новым айдишником - новая задача
    objOfTasks[newTask._id] = newTask;

    //возврщ.копию задачи
    return { ...newTask };
  }

  // удаляем таск в дом
  function deleteTask(id) {
    //получаем заголовок по айди
    const { title } = objOfTasks[id];
    // / запрос на то, точно ли хотим удалить таск
    const isConfirm = confirm(
      `Вы уверены, что хотите удалить задачу: ${title}?`
    );
    if (!isConfirm) {
      return isConfirm; // если человек нажал ОТМЕНА. Будет фолс
    }
    // Если человек нажал - ОК, то удаляем таск с определ. айдишником
    delete objOfTasks[id];
    return isConfirm;
  }

  // удаляем таск с HTML-разметки
  function deleteTaskFromHTML(confirmed, elem) {
    if (!confirmed) {
      return;
    }
    elem.remove(); //выносим в отдельную функию, ибо функционал может расширяться
  }

  function onDeleteHandler({ target }) {
    //вытягиваем сразу таргет ивента
    if (target.classList.contains('delete-btn')) {
      const parent = target.closest('[data-task-id]'); //передаем атрибут
      const id = parent.dataset.taskId; //пишем taskId(вместо task-id),ибо у нас атрибут задан через дефис
      const confirmed = deleteTask(id);

      deleteTaskFromHTML(confirmed, parent); //confirmed для проверки удаляем его или нет
    }
  }

  // ДВЕ ФУНКЦ. ДЛЯ ТЕМ
  // 1) Обраьотчик события
  function onThemeSelectHandler(e) {
    const selectedTheme = themeSelect.value;
    const isConfirmed = confirm(
      `Вы уверены, что хотите поменять тему: ${selectedTheme}`
    );
    if (!isConfirmed) {
      themeSelect.value = lastSelectedTheme;
      return;
    }
    setTheme(selectedTheme);
    lastSelectedTheme = selectedTheme;
    localStorage.setItem('theme', selectedTheme);
  }

  // 2)Функц. которая устанавливает тему
  function setTheme(nameTheme) {
    const selectedThemeObj = themes[nameTheme];
    Object.entries(selectedThemeObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }
})(tasks);
