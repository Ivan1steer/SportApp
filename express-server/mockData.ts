export interface Organization {
  id: number;
  name: string;
  address: string;
  tags: string[];
  sportTypes: string[];
  rating: number;
  images: string[];
  location: {
    lat: number;
    lng: number;
  };
  tariffs: {
    name: string;
    price: number;
    description: string;
  }[];
  description: string;
}

export interface Trainer {
  id: number;
  name: string;
  sportTypes: string[];
  rating: number;
  experience: number;
  description?: string;
  image: string;
  achievements?: string[];
}

export const mockOrganizations: Organization[] = [
  {
    id: 1,
    name: "Спорткомплекс 'Олимпия'",
    address: "ул. Ленина, 25",
    description: "Крупнейший фитнес-центр с бассейном и теннисными кортами",
    sportTypes: ["плавание", "теннис", "йога"],
    tags: ["парковка", "сауна", "детский клуб"],
    rating: 4.9,
    images: ["https://avatars.mds.yandex.net/get-altay/1349040/2a00000167ab50ca701028f70df93d8bb3ba/XXXL", "https://avatars.mds.yandex.net/i?id=526b2d848ccb3c57eaf8411716e34d9748c0dedb-6222399-images-thumbs&n=13"],
    location: {
      lat: 58.0134,
      lng: 56.2487
    },
    tariffs: [
      { name: "Дневной", price: 1800, description: "08:00-17:00" },
      { name: "Премиум", price: 3500, description: "Безлимит" }
    ]
  },
  {
    id: 2,
    name: "Скалодром 'Vertical'",
    address: "ул. Пушкина, 46",
    description: "Современный скалодром для профессионалов и новичков",
    sportTypes: ["скалолазание"],
    tags: ["прокат снаряжения", "инструкторы"],
    rating: 4.7,
    images: ["https://avatars.mds.yandex.net/i?id=526b2d848ccb3c57eaf8411716e34d9748c0dedb-6222399-images-thumbs&n=13"],
    location: {
      lat: 58.0089,
      lng: 56.2361
    },
    tariffs: [
      { name: "Разовое", price: 800, description: "2 часа" }
    ]
  },
  {
    id: 3,
    name: "Ледовая арена 'Победа'",
    address: "пр. Комсомольский, 12",
    description: "Олимпийская ледовая площадка",
    sportTypes: ["хоккей", "фигурное катание"],
    tags: ["прокат коньков", "раздевалки"],
    rating: 4.5,
    images: ["https://belregion.ru/upload/iblock/5a5/_MG_2554.jpg"],
    location: {
      lat: 58.0211,
      lng: 56.2598
    },
    tariffs: [
      { name: "Утренний сеанс", price: 300, description: "10:00-12:00" }
    ]
  }
];

export const mockTrainers: Trainer[] = [
  {
    id: 1,
    name: "Иванов Алексей Петрович",
    sportTypes: ["бокс", "ММА", "Боевое самбо"],
    rating: 4.9,
    experience: 8,
    image: "https://sun1-22.userapi.com/impg/r816cr6IYatBgCyZGTt3Ar0GArd-wkArja4PLQ/MV5PnisQaAI.jpg?size=721x721&quality=95&sign=e193e726c33b2ebe84eb12ea1247e670&c_uniq_tag=uRQqZObjm5J3fCEkdLXgL2pG1FsU0NvXp8-c9KMLJcQ&type=album",
    achievements: ["Чемпион России 2020", "Тренер года 2022"],
    description: "Профессиональный тренер по боксу с 8-летним опытом..."
  },
  {
    id: 2,
    name: "Смирнова Мария Игоревна",
    sportTypes: ["йога", "пилатес"],
    rating: 4.8,
    experience: 5,
    image: "https://ujur.trade-services.ru/img/cke/prepod-25.jpg",
    description: "Профессиональный тренер по йоге с 5-летним опытом...",
  }
];