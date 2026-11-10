export type MenuCategoryId = 'coffee' | 'breakfast' | 'desserts'

export interface MenuItem {
  id: string
  name: string
  description: string
  /** السعر بالجنيه المصري */
  price: number
  /** معرّف الصورة على Unsplash (الجزء اللي بعد photo-) */
  image: string
  tag?: string
}

export interface MenuCategory {
  id: MenuCategoryId
  label: string
  items: MenuItem[]
}

export const menu: MenuCategory[] = [
  {
    id: 'coffee',
    label: 'قهوة',
    items: [
      {
        id: 'espresso',
        name: 'إسبريسو',
        description: 'شوت دوبل من بن الأسبوع، قوام تقيل ونهاية حلوة.',
        price: 65,
        image: '1559496417-e7f25cb247f3',
      },
      {
        id: 'flat-white',
        name: 'فلات وايت',
        description: 'دوبل ريستريتو مع لبن متبخّر ناعم بطبقة رغوة رفيعة.',
        price: 95,
        image: '1485808191679-5f86510681a2',
        tag: 'الأكتر طلبًا',
      },
      {
        id: 'cappuccino',
        name: 'كابتشينو',
        description: 'توازن كلاسيكي بين الإسبريسو واللبن والرغوة.',
        price: 90,
        image: '1572442388796-11668a67e53d',
      },
      {
        id: 'v60',
        name: 'V60',
        description: 'تقطير يدوي بياخد وقته، وبيطلّع نوتات البن بوضوح.',
        price: 120,
        image: '1442512595331-e89e73853f31',
        tag: 'اختيار الباريستا',
      },
      {
        id: 'iced-latte',
        name: 'آيس لاتيه',
        description: 'إسبريسو على لبن ساقع وتلج. بسيط ومنعش.',
        price: 105,
        image: '1517701604599-bb29b565090c',
      },
      {
        id: 'cold-brew',
        name: 'كولد برو',
        description: 'منقوع على البارد ١٨ ساعة. ناعم وحموضته قليلة.',
        price: 110,
        image: '1461023058943-07fcbe16d735',
      },
    ],
  },
  {
    id: 'breakfast',
    label: 'فطار',
    items: [
      {
        id: 'avocado-toast',
        name: 'توست أفوكادو وبيض',
        description: 'عيش ساوردو محمّص، أفوكادو مهروس، وبيضة عيون.',
        price: 185,
        image: '1525351484163-7529414344d8',
        tag: 'الأكتر طلبًا',
      },
      {
        id: 'eggs-plate',
        name: 'طبق حَبّة',
        description: 'بيض عيون، توست بالزبدة، وخضار طازة على الجنب.',
        price: 160,
        image: '1533089860892-a7c6f0a88666',
      },
      {
        id: 'french-toast',
        name: 'فرنش توست',
        description: 'بريوش متحمّر بالزبدة، موز وتوت وشراب القيقب.',
        price: 175,
        image: '1484723091739-30a097e8f929',
      },
      {
        id: 'pancakes',
        name: 'بان كيك',
        description: 'تلات طبقات هشّة بالتوت الأزرق والعسل.',
        price: 165,
        image: '1528207776546-365bb710ee93',
      },
      {
        id: 'green-bowl',
        name: 'بول البيض والخضار',
        description: 'بيض مسلوق، سبانخ، أفوكادو، وصوص ليمون خفيف.',
        price: 170,
        image: '1482049016688-2d3e1b311543',
      },
      {
        id: 'croissant',
        name: 'كرواسون زبدة',
        description: 'مخبوز كل يوم الصبح، ٢٧ طبقة من الزبدة.',
        price: 75,
        image: '1555507036-ab1f4038808a',
      },
    ],
  },
  {
    id: 'desserts',
    label: 'حلويات',
    items: [
      {
        id: 'chocolate-cake',
        name: 'كيكة الشوكولاتة',
        description: 'شوكولاتة غامقة ٧٠٪ بطبقات جاناش غنية.',
        price: 130,
        image: '1578985545062-69928b1d9587',
        tag: 'الأكتر طلبًا',
      },
      {
        id: 'brownies',
        name: 'براونيز',
        description: 'طرية من جوّه ومقرمشة من برّه، بتتقدّم دافية.',
        price: 95,
        image: '1606313564200-e75d5e30476c',
      },
      {
        id: 'berry-cake',
        name: 'كيكة التوت',
        description: 'إسفنج فانيليا، كريمة خفيفة، وتوت طازة.',
        price: 125,
        image: '1565958011703-44f9829ba187',
      },
      {
        id: 'tiramisu',
        name: 'تيراميسو',
        description: 'ماسكربوني وإسبريسو من بن الأسبوع وكاكاو.',
        price: 135,
        image: '1571877227200-a0d98ea607e9',
      },
      {
        id: 'donuts',
        name: 'دونات',
        description: 'عجينة متخمّرة ٢٤ ساعة بتغطية بتتغيّر كل يوم.',
        price: 70,
        image: '1551024601-bec78aea704b',
      },
      {
        id: 'strawberry-cup',
        name: 'كوب الفراولة بالكريمة',
        description: 'فراولة موسمية على كريمة فانيليا ساقعة.',
        price: 110,
        image: '1488477181946-6428a0291777',
      },
    ],
  },
]
