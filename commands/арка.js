const dict = require("dict");


module.exports = {
    name: 'арка',
    cooldown: 1,
    aliases: [],
    arkes: dict({
        "1-32": "Миссия по спасению Казекаге",
        "33-53": "Инфильтрационная миссия на мосту Тенчи",
        "54-56": "Наруто тренируется",
        "57-71": "[Ф] Двенадцать Ниндзя-стражников (что то там про Сору)",
        "72-88": "Бессмертные опустошители — Хидан и Какудзу",
        "89-112": "[Ф] Появление Трёххвостого (+наруто грустит что нельзя юзать новую технику)",
        "113-118": "Миссия по поиску Итачи",
        "119-120": "Какаши Гайден",
        "121-126": "Миссия по поиску Итачи",
        "127-133": "История о доблестном Джирайе",
        "134-138": "Предначертанная битва между братьями",
        "139-143": "Тайна Тоби",
        "144-151": "[Ф] Высвобождение Шестихвостого",
        "152-169": "Нападение Пейна",
        "170-171": "[Ф] Большое приключение! В поисках наследства Четвертого Хокаге!",
        "172-175": "Нападение Пейна (время поболтать)",
        "176-196": "[Ф] Хроники Конохи",
        "197-222": "Собрание пяти Каге",
        "223-242": "[Ф] Райская жизнь на лодке",
        "243-256": "Наруто тусуется на острове",
        "257-260": "[Ф] Четырёхнедельный специальный проект для 10-й годовщины аниме: «Встреча» (4 серии флешбеков к предыдущим сериям)",
        "261-270": "Четвёртая великая война ниндзя",
        "271-271": "[Ф] В честь выпуска фильма! Путь Сакуры",
        "272-283": "Четвёртая великая война ниндзя",
        "284-289": "[Ф] Филлерные бои в великой войне шиноби? Да как они умудрились?",
        "290-295": "[Ф] Флешбеки про Наруто, Сакура, Сай и Ямато которые пинают Кабуто",
        "296-302": "Четвёртая великая война ниндзя: Враги из загробного мира",
        "303-310": "Битва против четвёрки звука, Флешбеки Хинато и ещё что-то",
        "311-311": "[Ф] Путь ниндзя: Пролог (ребята тусят в бане)",
        "312-320": "[Ф] Опять филлерные истории с поля битвы",
        "321-346": "Четвёртая великая война ниндзя: начало финальной битвы",
        "347-348": "Флешбеки про Яхико и Конан и Нагато",
        "349-361": "[Ф] Какаши в Анбу: Шиноби, живущий во тьме",
        "362-375": "Четвёртая великая война ниндзя: Возвращение команды № 7",
        "376-377": "[Ф] Наруто против Меха-Наруто",
        "378-388": "Четвёртая великая война ниндзя: Дзинтюрики Десятихвостого",
        "389-390": "[Ф] Филлеры про клан Хьюга",
        "391-393": "Четвёртая великая война ниндзя: Хз как назвать",
        "394-413": "[Ф] По стопам Наруто: Пути друзей",
        "414-415": "Вечное Цукуёми: Активация",
        "416-417": "[Ф] Флешбеки про Какаси, Обито и Рин",
        "418-421": "Вечное Цукуёми: Активация ч2",
        "422-423": "[Ф] Филлеры про Конохамару",
        "424-426": "Вечное Цукуёми: Активация ч3",
        "427-431": "[Ф] Путь Тэн-Тэн в мире снов, Рэп-хроники Киллера Би, Флешбеки Карин",
        "432-450": "[Ф] Свитки ниндзя Дзирайи 'Сказание о герое Наруто'",
        "451-458": "[Ф] История Итати 'Свет и тьма'",
        "459-459": "Появление Кагуи",
        "460-462": "[Ф] Флешбеки про Кагую и её сыновей",
        "463-463": "Непредсказуемый номер один!",
        "464-468": "Мудрец Шести Путей объясняет четверым Хокагэ происхождение Нинсю",
        "469-469": "[Ф] Спецвыпуск «Правда о его лице»",
        "470-479": "Наруто и Саскэ",
        "480-483": "[Ф] Отрочество (Наруто/Хината, Саскэ/Сакура, Гаара/Сикамару, Дзирайя/Какаси)",
        "484-488": "[новелла] История Саскэ: Восход солнца",
        "489-493": "[новелла] История Сикамару: Облако, дрейфующее в тихой темноте",
        "494-500": "[новелла] История Конохи: Идеальный день для свадьбы"
    }),
    execute(client, channel, tags, message) {
        if (message === '' || message.split(/ +/).length !== 1 || !Number.isInteger(+message)) return;

        const episode = +message;

        if (!(0 < episode && episode <= 500)) {
            client.say(channel, `@${tags.username} такой серии нет :(`);
            return;
        }

        let flag = true;
        this.arkes.forEach((value, key) => {
            if (+key.split('-')[0] <= episode && episode <= +key.split('-')[1]) {
                if (+key.split('-')[0] === +key.split('-')[1]) {
                    client.say(channel, `${key.split('-')[0]}: ${value}`);
                } else {
                    client.say(channel, `${key}: ${value}`);
                }
                flag = false;
            }
        });
        if (flag) {
            client.say(channel, `Филлерная арка. Мне лень парсить`);
        }
    },
};