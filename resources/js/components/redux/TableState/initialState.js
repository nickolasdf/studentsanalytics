
export const initialState = {
    info: [],
    last: 0,     //Нумерація останньої кнопки
    mover: 0,    //Початковий номер ряда для відображення
    maxCount: 6, //Максимальна кількість ПРОМІЖНИХ кнопок(між першою і останньою)
    startCount: 2, //Перша проміжна кнопка
    current: 1,    //Перша кнопка яка завжди є
    //------------- dropdown menu
    dropdownOpen: false,  //Для відкривання dropdown
    counters: [5, 15, 25], //Числа за якими можна змінювати кількість рядів
    currentAmount:5, //Поточна кількість відображених рядів
    //---------------- sorting in Header
    checking: " ", //Перевірка на повторний натиск сорт-кнопки
    direction: 1,  //напрямок сортування(за спаданням, збільшенням)

    pushedSort: false,
    isModalOpen: false,
    currentStudentId: null,
    rerenderTable: false
};
