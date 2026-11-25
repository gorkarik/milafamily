import type { LocationDef } from '../types/game';

export const LOCATIONS: LocationDef[] = [
  {
    id: 1,
    title: {
      ru: 'Семейная гостиная',
      uk: 'Сімейна вітальня',
      sk: 'Rodinná obývačka',
    },
    subtitle: {
      ru: 'Утренние сборы и игровой квест',
      uk: 'Ранкові збори та ігровий квест',
      sk: 'Ranné prípravy a hľadací quest',
    },
    featuredCharacter: 'sasha',
    miniStory: {
      ru: 'Солнечное субботнее утро началось с долгожданной новости: вся семья отправляется на Большой праздник и пикник на Праздничной поляне! Но стоило маме Лизе отвернуться, как маленький Миша устроил в гостиной настоящую «пиратскую бурю» из игрушек и мелочей. Папа Саша в своей любимой оливковой худи ещё допроходит уровень за светящимся компьютером, а Мила берёт в руки золотую лупу — пора навести порядок и найти все спрятанные вещи!',
      uk: 'Сонячний суботній ранок почався з довгоочікуваної новини: уся родина вирушає на Велике свято та пікнік на Святковій галявині! Та варто було мамі Лізі відвернутися, як маленький Міша влаштував у вітальні справжню «піратську бурю» з іграшок і дрібничок. Тато Саша у своєму улюбленому оливковому худі ще допроходить рівень за яскравим комп’ютером, а Міла бере до рук золоту лупу — час навести лад і знайти всі заховані речі!',
      sk: 'Slnečné sobotné ráno sa začalo úžasnou správou: celá rodina ide na Veľkú oslavu a piknik na Slávnostnú lúku! No len čo sa mama Liza otočila, malý Miško urobil v obývačke ozajstnú „pirátsku búrku“ z hračiek a drobností. Ocko Saša vo svojej obľúbenej olivovej mikine ešte dohráva úroveň za svietiacim počítačom a Mila berie do rúk zlatú lupu — je čas nájsť všetky ukryté veci!',
    },
    dialogues: [
      {
        speaker: 'liza',
        text: {
          ru: 'Доброе утро! Сегодня наш Большой семейный праздник и пикник! Только посмотри, какой беспорядок устроил Миша…',
          uk: 'Доброго ранку! Сьогодні наше Велике сімейне свято та пікнік! Тільки подивись, який безлад влаштував Міша…',
          sk: 'Dobré ráno! Dnes je naša Veľká rodinná oslava a piknik! Pozri sa však, aký neporiadok narobil Miško…',
        },
      },
      {
        speaker: 'misha',
        text: {
          ru: 'Хи-хи! Пиратский клад! Ту-ту!',
          uk: 'Хі-хі! Піратський скарб! Ту-ту!',
          sk: 'Hi-hi! Pirátsky poklad! Tu-tú!',
        },
      },
      {
        speaker: 'sasha',
        text: {
          ru: 'Я сейчас допройду уровень на компьютере и пойду заводить машину! Мила, поможешь маме прибраться?',
          uk: 'Я зараз допройду рівень на комп’ютері й піду заводити машину! Міло, допоможеш мамі прибрати?',
          sk: 'Len dokončím úroveň na počítači a pôjdem naštartovať auto! Mila, pomôžeš mame upratať?',
        },
      },
      {
        speaker: 'mila',
        text: {
          ru: 'Конечно! Моя лупа уже готова — найду все вещи за пару минут!',
          uk: 'Звісно! Моя лупа вже готова — знайду всі речі за пару хвилин!',
          sk: 'Samozrejme! Moja lupa je pripravená — nájdem všetko za pár minút!',
        },
      },
    ],
    outro: {
      ru: 'Мама Лиза: «Какая чистота, Мила! Теперь загляни на кухню — поможешь собрать вкусняшки для пикника!»',
      uk: 'Мама Ліза: «Яка чистота, Міло! Тепер зазирни на кухню — допоможеш зібрати смаколики для пікніка!»',
      sk: 'Mama Liza: „Aká čistota, Mila! Teraz poď do kuchyne — pomôžeš mi zbaliť maškrty na piknik!“',
    },
    ambient: 'dust',
    cardAccent: 'from-amber-900/80 via-stone-900/75 to-amber-950/90',
  },
  {
    id: 2,
    title: {
      ru: 'Уютная кухня',
      uk: 'Затишна кухня',
      sk: 'Útulná kuchyňa',
    },
    subtitle: {
      ru: 'Аромат чая и домашних угощений',
      uk: 'Аромат чаю та домашніх смаколиків',
      sk: 'Vôňa čaju a domácich dobrôt',
    },
    featuredCharacter: 'liza',
    miniStory: {
      ru: 'На кухне уже вовсю кипит чайник, а по столу разливается тёплый аромат корицы, свежей выпечки и спелых яблок. Мама Лиза собирает большую корзину для пикника, но в предпраздничной суете нужные баночки, приборы и лакомства разбежались по всем полкам. Помоги Миле внимательно осмотреть каждый шкафчик и столешницу, чтобы ничего не забыть дома!',
      uk: 'На кухні вже щосили кипить чайник, а кімнатою розливається теплий аромат кориці, свіжої випічки та стиглих яблук. Мама Ліза збирає великий кошик для пікніка, але у передсвятковій метушні потрібні баночки, прибори й ласощі розбіглися по всіх поличках. Допоможи Мілі уважно оглянути кожну шафку та стільницю, щоб нічого не забути вдома!',
      sk: 'V kuchyni už vrie kanvica a po stole sa šíri teplá vôňa škorice, čerstvého pečiva a zrelých jabĺk. Mama Liza balí veľký piknikový košík, ale v predsviatočnom zhone sa poháriky, náčinie aj maškrty roztratili po všetkých policiach. Pomôž Mile pozorne prezrieť každú skrinku a linku, aby nič nezostalo doma!',
    },
    dialogues: [
      {
        speaker: 'liza',
        text: {
          ru: 'Чайник уже кипит! Я готовлю бутерброды и печенье на пикник. Мила, найдёшь нужные вещи на кухне?',
          uk: 'Чайник уже кипить! Я готую бутерброди та печиво на пікнік. Міло, знайдеш потрібні речі на кухні?',
          sk: 'Kanvica už vrie! Chystám chlebíčky a sušienky na piknik. Mila, nájdeš mi potrebné veci v kuchyni?',
        },
      },
      {
        speaker: 'mila',
        text: {
          ru: 'С радостью, мамочка! Мои глаза-локаторы уже работают на полную!',
          uk: 'Із радістю, матусю! Мої очі-локатори вже працюють на повну!',
          sk: 'S radosťou, mami! Moje detektívne oči pracujú naplno!',
        },
      },
    ],
    outro: {
      ru: 'Мама Лиза: «Спасибо, солнышко! Теперь загляни в детскую — Миша там точно спрятал что-то важное!»',
      uk: 'Мама Ліза: «Дякую, сонечко! Тепер зазирни в дитячу — Міша там точно сховав щось важливе!»',
      sk: 'Mama Liza: „Ďakujem, slniečko! Teraz nakukni do detskej izby — Miško tam určite niečo dôležité schoval!“',
    },
    ambient: 'steam',
    cardAccent: 'from-orange-900/80 via-stone-900/75 to-amber-950/90',
  },
  {
    id: 3,
    title: {
      ru: 'Детская комната',
      uk: 'Дитяча кімната',
      sk: 'Detská izba',
    },
    subtitle: {
      ru: 'Тайники игрушек и секретов Миши',
      uk: 'Схованки іграшок і секретів Міші',
      sk: 'Tajné skrýše Miškových hračiek',
    },
    featuredCharacter: 'misha',
    miniStory: {
      ru: 'В детской комнате царит настоящее волшебство: яркие кубики, железная дорога, плюшевые звери и книжки со сказками. Но перед поездкой пропали любимая заколка Милы и дорожные игрушки Миши, без которых малыш ни за что не согласится сесть в автокресло. Миша хитро улыбается и подмигивает — придётся проявить настоящую детективную смекалку!',
      uk: 'У дитячій кімнаті панує справжня магія: яскраві кубики, залізниця, плюшеві звірята й книжки з казками. Та перед поїздкою зникли улюблена шпилька Міли та дорожні іграшки Міші, без яких малюк нізащо не погодиться сісти в автокрісло. Міша хитро всміхається й підморгує — доведеться проявити справжню детективну кмітливість!',
      sk: 'V detskej izbe vládne ozajstné čaro: farebné kocky, vláčiková dráha, plyšové zvieratká a rozprávkové knižky. Pred cestou však zmizla Milina obľúbená sponka aj Miškove hračky do auta, bez ktorých sa drobec nepohne ani na krok. Miško sa šibalsky usmieva — bude to chcieť poriadny detektívny postreh!',
    },
    dialogues: [
      {
        speaker: 'mila',
        text: {
          ru: 'Миша, куда ты спрятал мою любимую заколку и игрушки для дороги?',
          uk: 'Мішо, куди ти сховав мою улюблену шпильку й іграшки для дороги?',
          sk: 'Miško, kam si ukryl moju obľúbenú sponku a hračky na cestu?',
        },
      },
      {
        speaker: 'misha',
        text: {
          ru: 'Секрет! Ищи-ищи, Мила!',
          uk: 'Секрет! Шукай-шукай, Міло!',
          sk: 'Tajomstvo! Hľadaj, Mila!',
        },
      },
    ],
    outro: {
      ru: 'Мила: «Всё нашла! Папа говорит, бинокль и летняя шляпка остались на балконе — бегу туда!»',
      uk: 'Міла: «Усе знайшла! Тато каже, бінокль і літній капелюшок залишилися на балконі — біжу туди!»',
      sk: 'Mila: „Všetko mám! Ocko hovorí, že ďalekohľad a letný klobúk zostali na balkóne — bežím tam!“',
    },
    ambient: 'dust',
    cardAccent: 'from-rose-900/75 via-stone-900/75 to-amber-950/90',
  },
  {
    id: 4,
    title: {
      ru: 'Солнечный балкон',
      uk: 'Сонячний балкон',
      sk: 'Slnečný balkón',
    },
    subtitle: {
      ru: 'Цветущий оазис под тёплым ветром',
      uk: 'Квітучий оазис під теплим вітром',
      sk: 'Rozkvitnutá oáza v teplom vánku',
    },
    featuredCharacter: 'mila',
    miniStory: {
      ru: 'Уютный балкон утопает в герани, подсолнухах и вьющейся зелени, за которыми с любовью ухаживает мама Лиза. Лёгкий утренний ветерок колышет плетёные кашпо, а солнечные лучи заливают столик с лейками и садовыми мелочами. Среди ярких лепестков и подушек затерялись папин бинокль, солнцезащитные очки и шляпка для пикника — пора отыскать их все!',
      uk: 'Затишний балкон потопає в герані, соняшниках і виткій зелені, за якими з любов’ю доглядає мама Ліза. Легкий ранковий вітерець колише плетені кашпо, а сонячні промені заливають столик із лійками й садовими дрібничками. Серед яскравих пелюсток і подушок загубилися татів бінокль, сонячні окуляри та капелюшок для пікніка — час відшукати їх усі!',
      sk: 'Útulný balkón sa topí v muškátoch, slnečniciach a popínavej zeleni, o ktorú sa s láskou stará mama Liza. Ľahký ranný vánok pohojdáva závesné kvetináče a slnečné lúče zalievajú stolík s krhličkami. Medzi pestrými kvetmi a vankúšmi sa zatúlali ockov ďalekohľad, slnečné okuliare aj klobúk na piknik — nájdime ich všetky!',
    },
    dialogues: [
      {
        speaker: 'sasha',
        text: {
          ru: 'Мила, глянь на балконе среди цветов — там сушились шляпка и наш бинокль!',
          uk: 'Міло, глянь на балконі серед квітів — там сушилися капелюшок і наш бінокль!',
          sk: 'Mila, pozri na balkón medzi kvety — sušil sa tam klobúk a náš ďalekohľad!',
        },
      },
      {
        speaker: 'mila',
        text: {
          ru: 'Какой тёплый ветерок! И бабочка прилетела! Сейчас всё соберу!',
          uk: 'Який теплий вітерець! І метелик прилетів! Зараз усе зберу!',
          sk: 'Aký príjemný vetrík! A priletel aj motýlik! Hneď všetko pozbieram!',
        },
      },
    ],
    outro: {
      ru: 'Мила: «Отлично, всё со мной! Семья уже ждёт в прихожей — пора обуваться и выходить!»',
      uk: 'Міла: «Чудово, усе зі мною! Родина вже чекає в передпокої — час взуватися і виходити!»',
      sk: 'Mila: „Super, všetko mám! Rodina už čaká v predsieni — je čas obuť sa a vyraziť!“',
    },
    ambient: 'breeze',
    cardAccent: 'from-emerald-900/80 via-stone-900/75 to-amber-950/90',
  },
  {
    id: 5,
    title: {
      ru: 'Семейная прихожая',
      uk: 'Сімейний передпокій',
      sk: 'Rodinná predsieň',
    },
    subtitle: {
      ru: 'Последние минуты перед выходом',
      uk: 'Останні хвилини перед виходом',
      sk: 'Posledné minúty pred odchodom',
    },
    featuredCharacter: 'sasha',
    miniStory: {
      ru: 'В прихожей пахнет свежестью и предвкушением дороги: на вешалке висят лёгкие куртки, в большом зеркале отражается утренний свет, а на полках стоят десятки пар обуви и дорожных сумок. В последний момент выясняется, что пропали ключи от машины, зонтик на всякий случай и любимый сапожок Миши. Помоги Миле обыскать каждый уголок прихожей, чтобы семья не опоздала!',
      uk: 'У передпокої пахне свіжістю й передчуттям дороги: на вішалці висять легкі куртки, у великому дзеркалі відбивається ранкове світло, а на поличках стоять десятки пар взуття та сумок. В останню мить з’ясовується, що зникли ключі від машини, парасолька про всяк випадок і улюблений чобіток Міші. Допоможи Мілі обшукати кожен куточок передпокою, щоб родина не запізнилася!',
      sk: 'V predsieni to vonia sviežosťou a očakávaním výletu: na vešiaku visia ľahké bundy, vo veľkom zrkadle sa odráža ranné svetlo a na policiach stoja topánky aj cestovné tašky. V poslednej chvíli však zmizli kľúče od auta, dáždnik pre istotu a Miškova druhá čižmička. Pomôž Mile prezrieť každý kút predsiene, aby rodina nemeškala!',
    },
    dialogues: [
      {
        speaker: 'sasha',
        text: {
          ru: 'Все готовы, но куда делись ключи от машины, зонтик и второй сапожок Миши?',
          uk: 'Усі готові, але куди поділися ключі від машини, парасолька і другий чобіток Міші?',
          sk: 'Všetci sme hotoví, ale kam sa podeli kľúče od auta, dáždnik a Miškova druhá čižmička?',
        },
      },
      {
        speaker: 'mila',
        text: {
          ru: 'Я знаю все тайники в прихожей — дай мне пару минут, папа!',
          uk: 'Я знаю всі схованки в передпокої — дай мені пару хвилин, тату!',
          sk: 'Poznám všetky skrýše v predsieni — daj mi pár minút, ocko!',
        },
      },
    ],
    outro: {
      ru: 'Папа Саша: «Ключи нашлись! Выходим во двор! Ой, держите Мишу — он уже бежит к песочнице!»',
      uk: 'Тато Саша: «Ключі знайшлися! Виходимо у двір! Ой, тримайте Мішу — він уже біжить до пісочниці!»',
      sk: 'Ocko Saša: „Kľúče sa našli! Ideme na dvor! Jéj, chyťte Miška — už uteká na pieskovisko!“',
    },
    ambient: 'dust',
    cardAccent: 'from-stone-800/85 via-stone-900/80 to-amber-950/90',
  },
  {
    id: 6,
    title: {
      ru: 'Двор и детская площадка',
      uk: 'Двір і дитячий майданчик',
      sk: 'Dvor a detské ihrisko',
    },
    subtitle: {
      ru: 'Солнечный переполох у песочницы',
      uk: 'Сонячний переполох біля пісочниці',
      sk: 'Slnečný zhon pri pieskovisku',
    },
    featuredCharacter: 'misha',
    miniStory: {
      ru: 'Во дворе заливается птичий хор, кружится разноцветная вертушка, а под тенистым кленом манят качели и деревянная горка. Едва выбежав на улицу, Миша споткнулся о свой открытый рюкзачок — и все игрушки, формочки и мелочи разлетелись по всей площадке! Пока папа Саша открывает гараж, Мила и мама Лиза устраивают быструю спасательную операцию.',
      uk: 'У дворі співають пташки, крутиться різнокольоровий вітрячок, а під тінистим кленом манять гойдалка й дерев’яна гірка. Щойно вибігши на вулицю, Міша перечепився через свій відкритий рюкзачок — і всі іграшки, формочки та дрібнички розлетілися по всьому майданчику! Поки тато Саша відчиняє гараж, Міла й мама Ліза влаштовують швидку рятувальну операцію.',
      sk: 'Na dvore spievajú vtáčiky, krúti sa farebný veterník a pod tieňom javora lákajú hojdačky i drevená šmýkačka. Len čo Miško vybehol von, z otvoreného batôžka sa mu po celom ihrisku rozsypali hračky, formičky aj drobnosti! Kým ocko Saša otvára garáž, Mila s mamou Lizou rozbiehajú rýchlu záchrannú akciu.',
    },
    dialogues: [
      {
        speaker: 'misha',
        text: {
          ru: 'Качели! Песок! Вжух!',
          uk: 'Гойдалка! Пісок! Вжух!',
          sk: 'Hojdačka! Piesok! Fíha!',
        },
      },
      {
        speaker: 'liza',
        text: {
          ru: 'Из рюкзачка Миши высыпались игрушки прямо на площадку! Мила, соберёшь их, пока папа открывает гараж?',
          uk: 'Із рюкзачка Міші висипалися іграшки просто на майданчик! Міло, збереш їх, поки тато відчиняє гараж?',
          sk: 'Z Miškovho batôžka sa vysypali hračky rovno na ihrisko! Mila, pozbieraš ich, kým ocko otvorí garáž?',
        },
      },
    ],
    outro: {
      ru: 'Мила: «Готово, ни одной игрушки не потеряли! Бежим к папе в гараж — поможем загрузить багажник!»',
      uk: 'Міла: «Готово, жодної іграшки не загубили! Біжімо до тата в гараж — допоможемо завантажити багажник!»',
      sk: 'Mila: „Hotovo, ani jedna hračka sa nestratila! Poďme za ockom do garáže — pomôžeme naložiť kufor!“',
    },
    ambient: 'breeze',
    cardAccent: 'from-lime-900/80 via-stone-900/75 to-emerald-950/90',
  },
  {
    id: 7,
    title: {
      ru: 'Семейный гараж',
      uk: 'Сімейний гараж',
      sk: 'Rodinná garáž',
    },
    subtitle: {
      ru: 'Мастерская папы Саши и сборы в путь',
      uk: 'Майстерня тата Саші та збори в дорогу',
      sk: 'Dielňa ocka Sašu a balenie na cestu',
    },
    featuredCharacter: 'sasha',
    miniStory: {
      ru: 'Семейный гараж папы Саши — настоящая сокровищница: на стеллажах ровными рядами стоят банки с краской, велосипедные шлемы, рыболовные снасти, туристический термос и целая стена инструментов. Семейный автомобиль уже блестит и готов отправиться в путь, осталось только найти необходимые вещи для поездки на природу. Вооружись лупой и помоги папе отыскать всё на его верстаке и полках!',
      uk: 'Сімейний гараж тата Саші — справжня скарбниця: на стелажах стоять банки з фарбою, велосипедні шоломи, рибальські снасті, туристичний термос і ціла стіна інструментів. Сімейний автомобіль уже блищить і готовий вирушати в дорогу, залишилося тільки знайти необхідні речі для подорожі на природу. Озбройся лупою і допоможи татові відшукати все на його верстаку та полицях!',
      sk: 'Rodinná garáž ocka Sašu je ozajstná pokladnica: na regáloch stoja plechovky s farbou, cyklistické prilby, rybárske potreby, termoska aj celá stena náradia. Rodinné auto sa už leskne a je pripravené vyraziť, chýbajú len potrebné veci na výlet do prírody. Vezmi si lupu a pomôž ockovi všetko nájsť na jeho pracovnom stole a policiach!',
    },
    dialogues: [
      {
        speaker: 'sasha',
        text: {
          ru: 'Машина готова, осталось найти термос и нужные инструменты про запас! Поможешь папе, Мила?',
          uk: 'Машина готова, залишилося знайти термос і потрібні інструменти про запас! Допоможеш татові, Міло?',
          sk: 'Auto je pripravené, zostáva nájsť termosku a potrebné náradie do rezervy! Pomôžeš ockovi, Mila?',
        },
      },
      {
        speaker: 'mila',
        text: {
          ru: 'Конечно, пап! Сейчас всё найду на твоих полочках!',
          uk: 'Звісно, тату! Зараз усе знайду на твоїх поличках!',
          sk: 'Jasné, ocko! Hneď všetko nájdem na tvojich poličkách!',
        },
      },
    ],
    outro: {
      ru: 'Папа Саша: «Отлично! Выезжаем в город — сначала заедем в цветочную лавку за букетом для мамы!»',
      uk: 'Тато Саша: «Чудово! Вирушаємо в місто — спершу заїдемо до квіткової крамниці по букет для мами!»',
      sk: 'Ocko Saša: „Výborne! Vyrážame do mesta — najprv zájdeme do kvetinárstva po kyticu pre mamu!“',
    },
    ambient: 'dust',
    cardAccent: 'from-slate-800/85 via-stone-900/80 to-zinc-950/90',
  },
  {
    id: 8,
    title: {
      ru: 'Цветочная лавка',
      uk: 'Квіткова крамниця',
      sk: 'Kvetinárstvo',
    },
    subtitle: {
      ru: 'Море бутонов, лент и ароматов',
      uk: 'Море бутонів, стрічок і ароматів',
      sk: 'More kvetov, stúh a vôní',
    },
    featuredCharacter: 'liza',
    miniStory: {
      ru: 'Первая остановка в городе — уютная угловая цветочная лавка, где воздух пропитан ароматом роз, лаванды и эвкалипта. Деревянные витрины уставлены глиняными горшками, плетёными корзинами, шёлковыми лентами и садовыми ножницами. Мама Лиза выбирает самый красивый букет на праздничный стол, а Мила отправляется искать спрятанные среди цветов сокровища!',
      uk: 'Перша зупинка в місті — затишна квіткова крамниця, де повітря просякнуте ароматом троянд, лаванди та евкаліпта. Дерев’яні вітрини заставлені глиняними горщиками, плетеними кошиками, шовковими стрічками та садовими ножицями. Мама Ліза вибирає найкрасивіший букет на святковий стіл, а Міла вирушає шукати заховані серед квітів скарби!',
      sk: 'Prvá zastávka v meste — útulné rohové kvetinárstvo, kde vzduch vonia ružami, levanduľou a eukalyptom. Drevené pulty sú plné hlinených črepníkov, prútených košíkov, hodvábnych stúh a záhradníckych nožníc. Mama Liza vyberá najkrajšiu kyticu na slávnostný stôl a Mila sa púšťa do hľadania pokladov ukrytých medzi kvetmi!',
    },
    dialogues: [
      {
        speaker: 'liza',
        text: {
          ru: 'Какой чудесный аромат! Хочу взять яркий букет на праздничный стол. Мила, поможешь отыскать нужные мелочи среди цветов?',
          uk: 'Який чудовий аромат! Хочу взяти яскравий букет на святковий стіл. Міло, допоможеш знайти потрібні дрібнички серед квітів?',
          sk: 'Aká nádherná vôňa! Chcem vziať pestrú kyticu na slávnostný stôl. Mila, pomôžeš mi nájsť potrebné drobnosti medzi kvetmi?',
        },
      },
      {
        speaker: 'mila',
        text: {
          ru: 'Ой, тут даже весёлая пчёлка летает! Начинаю поиск!',
          uk: 'Ой, тут навіть весела бджілка літає! Починаю пошук!',
          sk: 'Jéj, lieta tu aj veselá včielka! Začínam hľadať!',
        },
      },
    ],
    outro: {
      ru: 'Мама Лиза: «Букет просто сказочный! А по соседству пахнет свежей выпечкой — заглянем в пекарню за тортом!»',
      uk: 'Мама Ліза: «Букет просто казковий! А поруч пахне свіжою випічкою — зазирнемо в пекарню по торт!»',
      sk: 'Mama Liza: „Kytica je rozprávková! A vedľa vonia čerstvé pečivo — zájdeme do pekárne po tortu!“',
    },
    ambient: 'breeze',
    cardAccent: 'from-pink-900/75 via-stone-900/75 to-emerald-950/90',
  },
  {
    id: 9,
    title: {
      ru: 'Сладкая пекарня',
      uk: 'Солодка пекарня',
      sk: 'Voňavá pekáreň',
    },
    subtitle: {
      ru: 'Круассаны, ягоды и праздничный торт',
      uk: 'Круасани, ягоди та святковий торт',
      sk: 'Croissanty, jahody a slávnostná torta',
    },
    featuredCharacter: 'mila',
    miniStory: {
      ru: 'Звон колокольчика над дверью встречает семью облаком ванили, тёплых круассанов и свежезаваренного какао. Стеклянные витрины ломятся от ягодных тартов, расписных пряников и сахарных кексов, а на самом почётном месте красуется семейный торт. Пока пекарь бережно упаковывает угощение, Мила помогает найти свечки, формочки и сладкие украшения среди уютного беспорядка пекарни!',
      uk: 'Дзвін дзвіночка над дверима зустрічає родину хмаркою ванілі, теплих круасанів і свіжозвареного какао. Скляні вітрини ломляться від ягідних тартів, розписних пряників і кексів, а на найпочеснішому місці красується сімейний торт. Поки пекар дбайливо пакує частування, Міла допомагає знайти свічки, формочки й солодкі прикраси серед затишного безладу пекарні!',
      sk: 'Zvonček nad dverami víta rodinu obláčikom vanilky, teplých croissantov a čerstvého kakaa. Sklenené vitríny sa prehýbajú pod ovocnými koláčikmi, zdobenými perníkmi a zákuskami, a na čestnom mieste stojí rodinná torta. Kým pekár opatrne balí dobroty, Mila pomáha nájsť sviečky, formičky a sladké ozdoby v útulnom ruchu pekárne!',
    },
    dialogues: [
      {
        speaker: 'mila',
        text: {
          ru: 'Ммм, как вкусно пахнет ванилью и клубникой! Наш праздничный торт уже почти готов!',
          uk: 'Ммм, як смачно пахне ваніллю й полуницею! Наш святковий торт уже майже готовий!',
          sk: 'Mmm, ako krásne vonia vanilka a jahody! Naša slávnostná torta je už takmer hotová!',
        },
      },
      {
        speaker: 'liza',
        text: {
          ru: 'Поможем пекарю найти свечку, ягоды и всё для украшения, пока он завязывает ленточку!',
          uk: 'Допоможемо пекарю знайти свічку, ягоди й усе для прикраси, поки він зав’язує стрічку!',
          sk: 'Pomôžme pekárovi nájsť sviečku, jahody a všetko na ozdobu, kým viaže stužku!',
        },
      },
    ],
    outro: {
      ru: 'Мила: «Торт в коробочке! Теперь прогуляемся через городской парк к пруду с уточками!»',
      uk: 'Міла: «Торт у коробочці! Тепер прогуляємося через міський парк до ставка з качечками!»',
      sk: 'Mila: „Torta je v krabici! Teraz sa prejdeme cez mestský park k jazierku s kačkami!“',
    },
    ambient: 'steam',
    cardAccent: 'from-amber-800/80 via-rose-950/75 to-stone-950/90',
  },
  {
    id: 10,
    title: {
      ru: 'Парк у пруда',
      uk: 'Парк біля ставка',
      sk: 'Park pri jazierku',
    },
    subtitle: {
      ru: 'Уточки, мостик и пропавший кораблик',
      uk: 'Качечки, місток і зниклий кораблик',
      sk: 'Kačičky, mostík a stratená loďka',
    },
    featuredCharacter: 'misha',
    miniStory: {
      ru: 'В старом городском парке золотится листва плакучих ив, переливается на солнце фонтан, а по зеркальной воде пруда важно плавают уточки. Миша запустил свой любимый кораблик, но озорной порыв ветра унёс его к самым кувшинкам вместе с несколькими вещицами с лавочки. Время внимательно обследовать берег, мостик и тенистые аллеи парка!',
      uk: 'У старому міському парку золотиться листя плакучих верб, переливається на сонці фонтан, а дзеркальною водою ставка поважно плавають качечки. Міша запустив свій улюблений кораблик, але пустотливий порив вітру поніс його до самісіньких латаття разом із кількома речами з лавочки. Час уважно обстежити берег, місток і тінисті алеї парку!',
      sk: 'V starom mestskom parku sa ligoce lístie smútočných vŕb, na slnku sa trbliece fontána a po zrkadlovej hladine jazierka plávajú kačky. Miško pustil svoju obľúbenú loďku, no nezbedný závan vetra ju odniesol až k leknám spolu s niekoľkými drobnosťami z lavičky. Je čas pozorne prezrieť breh, mostík aj tienisté chodníčky!',
    },
    dialogues: [
      {
        speaker: 'misha',
        text: {
          ru: 'Кря-кря! Кораблик уплыл!',
          uk: 'Кря-кря! Кораблик поплив!',
          sk: 'Kač-kač! Loďka odplávala!',
        },
      },
      {
        speaker: 'mila',
        text: {
          ru: 'Не расстраивайся, Мишенька! Сейчас найдём и твой кораблик, и все остальные вещи на берегу!',
          uk: 'Не засмучуйся, Мішенько! Зараз знайдемо і твій кораблик, і всі інші речі на березі!',
          sk: 'Nesmúť, Miško! Hneď nájdeme tvoju loďku aj všetky ostatné veci na brehu!',
        },
      },
    ],
    outro: {
      ru: 'Мила: «Ура, кораблик спасён! Смотрите, за поворотом уже виднеется мельница мини-фермы — Миша точно обрадуется кроликам!»',
      uk: 'Міла: «Ура, кораблик врятовано! Дивіться, за поворотом уже видніється млин міні-ферми — Міша точно зрадіє кроликам!»',
      sk: 'Mila: „Hurá, loďka je zachránená! Pozrite, za zákrutou už vidno mlyn minifarmy — Miško sa poteší zajačikom!“',
    },
    ambient: 'breeze',
    cardAccent: 'from-teal-900/80 via-emerald-950/75 to-stone-950/90',
  },
  {
    id: 11,
    title: {
      ru: 'Уютная мини-ферма',
      uk: 'Затишна міні-ферма',
      sk: 'Útulná minifarma',
    },
    subtitle: {
      ru: 'Кролики, мельница и тёплое сено',
      uk: 'Кролики, млин і тепле сіно',
      sk: 'Zajačiky, mlyn a voňavé seno',
    },
    featuredCharacter: 'sasha',
    miniStory: {
      ru: 'На солнечном пригороде крутятся деревянные лопасти старой мельницы, а возле красного амбара резвятся пушистые кролики и кудахчут курочки. В воздухе витает запах свежего сена, спелой морковки и домашнего сыра. Папа Саша предлагает ненадолго остановиться, чтобы покормить зверят и разыскать все фермерские сокровища, спрятанные вокруг амбара и огорода!',
      uk: 'На сонячному передмісті крутяться дерев’яні крила старого млина, а біля червоної комори граються пухнасті кролики й квокчуть курочки. У повітрі витає запах свіжого сіна, стиглої моркви та домашнього сиру. Тато Саша пропонує ненадовго зупинитися, щоб погодувати звірят і розшукати всі фермерські скарби навколо комори та городу!',
      sk: 'Na slnečnom predmestí sa točia drevené lopatky starého mlyna a pri červenej stodole poskakujú huňaté zajačiky a sliepočky. Vo vzduchu cítiť vôňu čerstvého sena, sladkej mrkvy a domáceho syra. Ocko Saša navrhuje na chvíľu zastaviť, nakŕmiť zvieratká a nájsť všetky farmárske poklady ukryté okolo stodoly a záhradky!',
    },
    dialogues: [
      {
        speaker: 'sasha',
        text: {
          ru: 'Заехали на минутку покормить кроликов! Мила, поможешь найти морковку, угощения и фермерские штучки возле амбара?',
          uk: 'Заїхали на хвилинку погодувати кроликів! Міло, допоможеш знайти морквинку, смаколики й фермерські речі біля комори?',
          sk: 'Zastavili sme sa na chvíľku nakŕmiť zajačiky! Mila, pomôžeš nájsť mrkvu, maškrty a farmárske veci pri stodole?',
        },
      },
      {
        speaker: 'mila',
        text: {
          ru: 'Ого, как здорово крутится мельница! Сейчас всё найду для зверят!',
          uk: 'Ого, як чудово крутиться млин! Зараз усе знайду для звірят!',
          sk: 'Wau, ako krásne sa točí mlyn! Hneď všetko nájdem pre zvieratká!',
        },
      },
    ],
    outro: {
      ru: 'Папа Саша: «Кролики в восторге! Перед набережной заглянем в книжный уголок — возьмём сказку для Миши и карту к поляне!»',
      uk: 'Тато Саша: «Кролики в захваті! Перед набережною зазирнемо в книгарню чудес — візьмемо казку для Міші та карту до галявини!»',
      sk: 'Ocko Saša: „Zajačiky sú nadšené! Pred nábrežím zájdeme do kníhkupectva — kúpime rozprávku pre Miška a mapu na lúku!“',
    },
    ambient: 'breeze',
    cardAccent: 'from-amber-900/80 via-red-950/70 to-stone-950/90',
  },
  {
    id: 12,
    title: {
      ru: 'Книгарня чудес',
      uk: 'Книгарня чудес',
      sk: 'Kníhkupectvo zázrakov',
    },
    subtitle: {
      ru: 'Старинные полки, глобус и рыжий кот',
      uk: 'Старовинні полиці, глобус і рудий кіт',
      sk: 'Staré police, glóbus a ryšavý kocúr',
    },
    featuredCharacter: 'mila',
    miniStory: {
      ru: 'В крошечной книжной лавке царит полумрак, согретый янтарным светом витражных ламп. Высокие дубовые стеллажи до потолка заставлены цветными переплётами, старинными глобусами, компасами и свитками карт, а на тёплой полке сладко дремлет рыжий кот. Здесь хранится старинная карта короткой тропы к Праздничной поляне — помоги Миле и маме Лизе отыскать её вместе с другими чудесными вещицами!',
      uk: 'У крихітній книгарні панує напівтемрява, зігріта бурштиновим світлом вітражних ламп. Високі дубові стелажі до стелі заставлені барвистими палітурками, старовинними глобусами, компасами та сувоями карт, а на теплій полиці солодко дрімає рудий кіт. Тут зберігається старовинна карта короткої стежки до Святкової галявини — допоможи Мілі й мамі Лізі відшукати її разом з іншими дивовижними речами!',
      sk: 'V útulnom starom kníhkupectve vládne hrejivé prítmie osvetlené jantárovými lampami. Vysoké dubové police až po strop sú plné farebných kníh, starých glóbusov, kompasov a zvitkov máp, zatiaľ čo na polici sladko podriemkava ryšavý kocúr. Práve tu sa skrýva stará mapa skratky na Slávnostnú lúku — pomôž Mile a mame Lize nájsť ju spolu s ďalšími zázračnými drobnosťami!',
    },
    dialogues: [
      {
        speaker: 'mila',
        text: {
          ru: 'Ух ты, какая волшебная книжная лавка! Здесь и старинный глобус, и спящий рыжий котик!',
          uk: 'Ого, яка чарівна книжкова крамниця! Тут і старовинний глобус, і сонний рудий котик!',
          sk: 'Páni, aké čarovné kníhkupectvo! Je tu starý glóbus aj spiaca ryšavá mačička!',
        },
      },
      {
        speaker: 'liza',
        text: {
          ru: 'Давай найдём карту-свиток к Праздничной поляне, компас и все волшебные мелочи на полках!',
          uk: 'Давай знайдемо карту-сувій до Святкової галявини, компас і всі чарівні дрібнички на полицях!',
          sk: 'Nájdime mapu na Slávnostnú lúku, kompas a všetky čarovné drobnosti na policiach!',
        },
      },
    ],
    outro: {
      ru: 'Мила: «Карта у нас! По ней видно, что путь к поляне лежит через солнечную набережную у старого маяка!»',
      uk: 'Міла: «Карта в нас! По ній видно, що шлях до галявини лежить через сонячну набережну біля старого маяка!»',
      sk: 'Mila: „Mapu máme! Ukazuje, že cesta na lúku vedie popri slnečnom móle pri starom majáku!“',
    },
    ambient: 'dust',
    cardAccent: 'from-amber-950/90 via-stone-900/80 to-yellow-950/90',
  },
  {
    id: 13,
    title: {
      ru: 'Набережная у маяка',
      uk: 'Набережна біля маяка',
      sk: 'Mólo pri majáku',
    },
    subtitle: {
      ru: 'Морской бриз, ракушки и парусники',
      uk: 'Морський бриз, мушлі та вітрильники',
      sk: 'Morský vánok, mušle a plachetnice',
    },
    featuredCharacter: 'liza',
    miniStory: {
      ru: 'Деревянный причал ведёт прямо к полосатому маяку, мимо которого по сверкающей бирюзовой бухте скользят белые парусники. Кричат чайки, пахнет солёным бризом, а вдоль канатов и рыболовных сетей разбросаны перламутровые ракушки и морские звёзды. Папа Саша мечтает сделать семейный снимок на память, но фотоаппарат и морские сувениры нужно сперва разыскать на оживлённой набережной!',
      uk: 'Дерев’яний причал веде просто до смугастого маяка, повз який блискучою бірюзовою бухтою ковзають білі вітрильники. Кричать чайки, пахне солоним бризом, а вздовж канатів і рибальських сіток розкидані перламутрові мушлі та морські зірки. Тато Саша мріє зробити сімейний знімок на згадку, але фотоапарат і морські сувеніри треба спершу відшукати на жвавій набережній!',
      sk: 'Drevené mólo vedie rovno k pruhovanému majáku, popri ktorom po trblietavej tyrkysovej zátoke plávajú biele plachetnice. Krik čajok sa mieša so slaným vánkom a pri lanách a rybárskych sieťach ležia perleťové mušle a morské hviezdice. Ocko Saša chce urobiť rodinnú fotografiu na pamiatku, no najprv musíte na rušnom nábreží nájsť fotoaparát a morské poklady!',
    },
    dialogues: [
      {
        speaker: 'sasha',
        text: {
          ru: 'Какой морской бриз! Хочу сфотографировать вас на фоне маяка — но куда запропастились фотоаппарат и бинокль?',
          uk: 'Який морський бриз! Хочу сфотографувати вас на тлі маяка — але куди поділися фотоапарат і бінокль?',
          sk: 'Aký morský vánok! Chcem vás odfotiť pri majáku — ale kam sa podel fotoaparát a ďalekohľad?',
        },
      },
      {
        speaker: 'mila',
        text: {
          ru: 'И я ещё хочу собрать красивые ракушки и морскую звёздочку на память!',
          uk: 'І я ще хочу зібрати красиві мушлі та морську зірочку на згадку!',
          sk: 'A ja ešte pozbieram pekné mušle a morskú hviezdicu na pamiatku!',
        },
      },
    ],
    outro: {
      ru: 'Папа Саша: «Отличный снимок! Впереди уже зажглось колесо обозрения — заглянем на весёлую вечернюю ярмарку!»',
      uk: 'Тато Саша: «Чудовий знімок! Попереду вже засвітилося колесо огляду — зазирнемо на веселий вечірній ярмарок!»',
      sk: 'Ocko Saša: „Skvelá fotka! Vpredu sa už rozsvietilo ruské koleso — zastavíme sa na veselom večernom jarmoku!“',
    },
    ambient: 'sea',
    cardAccent: 'from-sky-900/80 via-slate-900/80 to-cyan-950/90',
  },
  {
    id: 14,
    title: {
      ru: 'Весёлая ярмарка',
      uk: 'Веселий ярмарок',
      sk: 'Zábavný jarmok',
    },
    subtitle: {
      ru: 'Огни каруселей и конкурс «Зоркий глаз»',
      uk: 'Вогні каруселей і конкурс «Зірке око»',
      sk: 'Svetlá kolotočov a súťaž Bystré oko',
    },
    featuredCharacter: 'mila',
    miniStory: {
      ru: 'Над городом спускаются тёплые бархатные сумерки, и старинная ярмарка вспыхивает тысячами золотых гирлянд. В воздухе плывёт аромат сладкого попкорна и карамельных яблок, медленно вращается огромное колесо обозрения, а в полосатых шатрах ждут призы. Если Мила победит в конкурсе «Зоркий глаз» и отыщет все спрятанные предметы, Миша получит в подарок огромного плюшевого медвежонка!',
      uk: 'Над містом спускаються теплі оксамитові сутінки, і старовинний ярмарок спалахує тисячами золотих гірлянд. У повітрі пливе аромат солодкого попкорну та карамельних яблук, повільно обертається величезне колесо огляду, а в смугастих шатрах чекають призи. Якщо Міла переможе в конкурсі «Зірке око» і відшукає всі заховані предмети, Міша отримає у подарунок величезного плюшевого ведмедика!',
      sk: 'Nad mestom sa spúšťa teplý zamatový súmrak a starý jarmok sa rozžiari tisícami zlatých svetielok. Vo vzduchu cítiť sladký pukance a karamelové jablká, pomaly sa točí obrovské ruské koleso a v pruhovaných stánkoch čakajú výhry. Ak Mila vyhrá súťaž Bystré oko a nájde všetky ukryté predmety, Miško získa veľkého plyšového medvedíka!',
    },
    dialogues: [
      {
        speaker: 'mila',
        text: {
          ru: 'Ура, ярмарка! Если я выиграю в конкурсе «Зоркий глаз», то получу для Миши большого плюшевого мишку!',
          uk: 'Ура, ярмарок! Якщо я виграю в конкурсі «Зірке око», то отримаю для Міші великого плюшевого ведмедика!',
          sk: 'Hurá, jarmok! Ak vyhrám v súťaži Bystré oko, vyhrám pre Miška veľkého plyšového medvedíka!',
        },
      },
      {
        speaker: 'misha',
        text: {
          ru: 'Мишку! Ура-ура!',
          uk: 'Ведмедика! Ура-ура!',
          sk: 'Medvedíka! Hurá-hurá!',
        },
      },
    ],
    outro: {
      ru: 'Мила: «ЕСТЬ! Мы выиграли приз для Миши! А вон и вход на нашу Праздничную поляну — последняя, самая волшебная остановка!»',
      uk: 'Міла: «Є! Ми виграли приз для Міші! А он і вхід на нашу Святкову галявину — остання, найчарівніша зупинка!»',
      sk: 'Mila: „MÁME TO! Vyhrali sme cenu pre Miška! A tam je už vstup na našu Slávnostnú lúku — posledná, najčarovnejšia zastávka!“',
    },
    ambient: 'twinkle',
    cardAccent: 'from-indigo-950/85 via-amber-950/75 to-rose-950/90',
  },
  {
    id: 15,
    title: {
      ru: 'Праздничная поляна',
      uk: 'Святкова галявина',
      sk: 'Slávnostná lúka',
    },
    subtitle: {
      ru: 'Золотой закат и Большой семейный праздник',
      uk: 'Золотий захід сонця та Велике сімейне свято',
      sk: 'Zlatý západ slnka a Veľká rodinná oslava',
    },
    featuredCharacter: 'liza',
    miniStory: {
      ru: 'Вот она — волшебная Праздничная поляна в лучах малиново-золотого заката! Между раскидистыми дубами натянуты тёплые гирлянды, в траве танцуют светлячки, а на большом клетчатом пледе уже расставлены угощения, подарки и семейные фотографии. Остался финальный поиск Милы: найди последние праздничные сокровища, чтобы зажечь огни и отметить лучший семейный день в году!',
      uk: 'Ось вона — чарівна Святкова галявина у променях малиново-золотого заходу сонця! Між розлогими дубами натягнуті теплі гірлянди, у траві танцюють світлячки, а на великому картатому пледі вже розставлені частування, подарунки й сімейні фотографії. Залишився фінальний пошук Міли: знайди останні святкові скарби, щоб запалити вогні й відсвяткувати найкращий сімейний день року!',
      sk: 'Konečne je tu — čarovná Slávnostná lúka v lúčoch zlato-ružového západu slnka! Medzi košatými dubmi svietia teplé girlandy, v tráve tancujú svetlušky a na veľkej károvanej deke už čakajú dobroty, darčeky a rodinné fotky. Pred Milou je finálne hľadanie: nájdi posledné slávnostné poklady, aby ste spoločne oslávili najkrajší rodinný deň v roku!',
    },
    dialogues: [
      {
        speaker: 'liza',
        text: {
          ru: 'Мы на месте! Как красиво горят огоньки на нашей Праздничной поляне!',
          uk: 'Ми на місці! Як гарно горять вогники на нашій Святковій галявині!',
          sk: 'Sme tu! Ako krásne svietia svetielka na našej Slávnostnej lúke!',
        },
      },
      {
        speaker: 'sasha',
        text: {
          ru: 'Мила, осталось разыскать последние праздничные сокровища — и можно начинать наш лучший семейный вечер!',
          uk: 'Міло, залишилося відшукати останні святкові скарби — і можна починати наш найкращий сімейний вечір!',
          sk: 'Mila, zostáva nájsť posledné slávnostné poklady — a môžeme začať náš najlepší rodinný večer!',
        },
      },
      {
        speaker: 'mila',
        text: {
          ru: 'Это было самое классное приключение на свете! Поехали — финальный поиск!',
          uk: 'Це була найкласніша пригода у світі! Поїхали — фінальний пошук!',
          sk: 'Bolo to najúžasnejšie dobrodružstvo na svete! Poďme — finálne hľadanie!',
        },
      },
    ],
    outro: {
      ru: 'Вся семья вместе: «УРА! Спасибо, Мила — ты настоящий мастер поиска! Лучший Семейный день удался на славу!»',
      uk: 'Уся родина разом: «УРА! Дякуємо, Міло — ти справжній майстер пошуку! Найкращий Сімейний день удався на славу!»',
      sk: 'Celá rodina spolu: „HURÁ! Ďakujeme, Mila — si skutočná majsterka hľadania! Najlepší Rodinný deň sa vydaril na výbornú!“',
    },
    ambient: 'twinkle',
    cardAccent: 'from-amber-800/80 via-orange-950/75 to-indigo-950/90',
  },
];

export function getLocationById(id: number): LocationDef {
  return LOCATIONS.find((l) => l.id === id) ?? LOCATIONS[0];
}
