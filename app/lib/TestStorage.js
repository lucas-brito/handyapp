const users = [
  {
    id: 1,
    type: 'provider',
    categories: ['cleaning', 'gardening', 'electricity'],
    fullname: 'José Carvalho',
    email: 'jc@handy.com',
    password: '1234',
    google: null,
    facebook: null,
    twitter: null,
    picture: 'https://3.bp.blogspot.com/-Gkkqqs0z7YM/W27doE1zQOI/AAAAAAAAAlM/PtJ8TdAHRPUJp5CZg4AJmOb8_6ZD81XjwCLcBGAs/s1600/Jardineiro.jpg',
    ratings: { quality: 4.75, price: 4, totalCount: 122 },
    created: '2020-01-13 10:00:00'
  },
  {
    id: 2,
    type: 'provider',
    categories: ['gardening', 'pumbling', 'painting'],
    fullname: 'Luiz da Silva',
    email: 'ls@handy.com',
    password: '1234',
    google: null,
    facebook: null,
    twitter: null,
    picture: 'https://miro.medium.com/max/400/1*mrOXGyIa3BlPK80peLmEbA.png',
    ratings: { quality: 4.5, price: 4.75, totalCount: 38 },
    created: '2020-01-13 10:00:00'
  },
  {
    id: 3,
    type: 'provider',
    categories: ['pumbling', 'gardening', 'cleaning'],
    fullname: 'Marcos Oliveira',
    email: 'mo@handy.com',
    password: '1234',
    google: null,
    facebook: null,
    twitter: null,
    picture: 'https://secure.meetupstatic.com/photos/event/4/a/b/5/600_466219125.jpeg',
    ratings: { quality: 4.5, price: 5, totalCount: 12 },
    created: '2020-01-13 10:00:00'
  },
  {
    id: 4,
    type: 'provider',
    categories: ['electricity', 'cleaning'],
    fullname: 'Sergio Moraes',
    email: 'sm@handy.com',
    password: '1234',
    google: null,
    facebook: null,
    twitter: null,
    picture: 'https://dwglogo.com/wp-content/uploads/2018/03/Dart_logo.png',
    ratings: { quality: 4.5, price: 3.75, totalCount: 134 },
    created: '2020-01-13 10:00:00'
  },
  {
    id: 5,
    type: 'provider',
    categories: ['painting', 'electricity'],
    fullname: 'Paula Ferreira',
    email: 'pf@handy.com',
    password: '1234',
    google: null,
    facebook: null,
    twitter: null,
    picture: 'https://developer.apple.com/swift/images/swift-og.png',
    ratings: { quality: 4.5, price: 3.75, totalCount: 113 },
    created: '2020-01-13 10:00:00'
  },
  {
    id: 6,
    type: 'provider',
    categories: ['cleaning', 'gardening', 'painting'],
    fullname: 'Guilherme Diogo',
    email: 'gd@handy.com',
    password: '1234',
    google: null,
    facebook: null,
    twitter: null,
    picture: 'https://secure.meetupstatic.com/photos/event/4/a/b/5/600_466219125.jpeg',
    ratings: { quality: 4.75, price: 4, totalCount: 122 },
    created: '2020-01-13 10:00:00'
  },
  {
    id: 7,
    type: 'provider',
    categories: ['gardening', 'pumbling'],
    fullname: 'Isaac Oliver',
    email: 'io@handy.com',
    password: '1234',
    google: null,
    facebook: null,
    twitter: null,
    picture: 'https://miro.medium.com/max/400/1*mrOXGyIa3BlPK80peLmEbA.png',
    ratings: { quality: 4.5, price: 4.75, totalCount: 38 },
    created: '2020-01-13 10:00:00'
  },
  {
    id: 8,
    type: 'provider',
    categories: ['pumbling', 'painting'],
    fullname: 'Benjamin Yago',
    email: 'by@handy.com',
    password: '1234',
    google: null,
    facebook: null,
    twitter: null,
    picture: 'https://kotlinlang.org/assets/images/open-graph/kotlin_250x250.png',
    ratings: { quality: 4.5, price: 5, totalCount: 12 },
    created: '2020-01-13 10:00:00'
  },
  {
    id: 9,
    type: 'provider',
    categories: ['electricity', 'cleaning'],
    fullname: 'Brenda Sophia',
    email: 'bs@handy.com',
    password: '1234',
    google: null,
    facebook: null,
    twitter: null,
    picture: 'https://kotlinlang.org/assets/images/open-graph/kotlin_250x250.png',
    ratings: { quality: 4.5, price: 3.75, totalCount: 134 },
    created: '2020-01-13 10:00:00'
  },
  {
    id: 10,
    type: 'provider',
    categories: ['painting', 'gardening', 'pumbling'],
    fullname: 'Danilo Yuri',
    email: 'dy@handy.com',
    password: '1234',
    google: null,
    facebook: null,
    twitter: null,
    picture: 'https://secure.meetupstatic.com/photos/event/4/a/b/5/600_466219125.jpeg',
    ratings: { quality: 4.5, price: 3.75, totalCount: 113 },
    created: '2020-01-13 10:00:00'
  },
  {
    id: 11,
    type: 'provider',
    categories: ['cleaning', 'painting'],
    fullname: 'Arthur Elias',
    email: 'ae@handy.com',
    password: '1234',
    google: null,
    facebook: null,
    twitter: null,
    picture: 'https://kotlinlang.org/assets/images/open-graph/kotlin_250x250.png',
    ratings: { quality: 4.75, price: 4, totalCount: 122 },
    created: '2020-01-13 10:00:00'
  },
  {
    id: 12,
    type: 'provider',
    categories: ['gardening', 'cleaning'],
    fullname: 'Isabel Louise',
    email: 'il@handy.com',
    password: '1234',
    google: null,
    facebook: null,
    twitter: null,
    picture: 'https://developer.apple.com/swift/images/swift-og.png',
    ratings: { quality: 4.5, price: 4.75, totalCount: 38 },
    created: '2020-01-13 10:00:00'
  },
  {
    id: 13,
    type: 'provider',
    categories: ['pumbling', 'electricity'],
    fullname: 'Lorenzo Andre',
    email: 'la@handy.com',
    password: '1234',
    google: null,
    facebook: null,
    twitter: null,
    picture: 'https://secure.meetupstatic.com/photos/event/4/a/b/5/600_466219125.jpeg',
    ratings: { quality: 4.5, price: 5, totalCount: 12 },
    created: '2020-01-13 10:00:00'
  },
  {
    id: 14,
    type: 'provider',
    categories: ['electricity', 'pumbling'],
    fullname: 'José Maciel',
    email: 'jm@handy.com',
    password: '1234',
    google: null,
    facebook: null,
    twitter: null,
    picture: 'https://dwglogo.com/wp-content/uploads/2018/03/Dart_logo.png',
    ratings: { quality: 4.5, price: 3.75, totalCount: 134 },
    created: '2020-01-13 10:00:00'
  },
  {
    id: 15,
    type: 'provider',
    categories: ['painting', 'gardening', 'electricity'],
    fullname: 'Miguel Duarte',
    email: 'md@handy.com',
    password: '1234',
    google: null,
    facebook: null,
    twitter: null,
    picture: 'https://developer.apple.com/swift/images/swift-og.png',
    ratings: { quality: 4.5, price: 3.75, totalCount: 113 },
    created: '2020-01-13 10:00:00'
  },
  {
    id: 16,
    type: 'provider',
    categories: ['cleaning', 'painting'],
    fullname: 'Cauã Dantas',
    email: 'cd@handy.com',
    password: '1234',
    google: null,
    facebook: null,
    twitter: null,
    picture: 'https://kotlinlang.org/assets/images/open-graph/kotlin_250x250.png',
    ratings: { quality: 4.75, price: 4, totalCount: 122 },
    created: '2020-01-13 10:00:00'
  },
  {
    id: 17,
    type: 'provider',
    categories: ['gardening', 'cleaning'],
    fullname: 'Dahas Abrahim',
    email: 'da@handy.com',
    password: '1234',
    google: null,
    facebook: null,
    twitter: null,
    picture: 'https://developer.apple.com/swift/images/swift-og.png',
    ratings: { quality: 4.5, price: 4.75, totalCount: 38 },
    created: '2020-01-13 10:00:00'
  },
  {
    id: 18,
    type: 'provider',
    categories: ['pumbling', 'electricity'],
    fullname: 'Isabelle Rocha',
    email: 'ir@handy.com',
    password: '1234',
    google: null,
    facebook: null,
    twitter: null,
    picture: 'https://secure.meetupstatic.com/photos/event/4/a/b/5/600_466219125.jpeg',
    ratings: { quality: 4.5, price: 5, totalCount: 12 },
    created: '2020-01-13 10:00:00'
  },
  {
    id: 19,
    type: 'provider',
    categories: ['electricity', 'pumbling'],
    fullname: 'Erick Fernando',
    email: 'ef@handy.com',
    password: '1234',
    google: null,
    facebook: null,
    twitter: null,
    picture: 'https://dwglogo.com/wp-content/uploads/2018/03/Dart_logo.png',
    ratings: { quality: 4.5, price: 3.75, totalCount: 134 },
    created: '2020-01-13 10:00:00'
  },
  {
    id: 20,
    type: 'provider',
    categories: ['painting', 'gardening', 'electricity'],
    fullname: 'Antônio da Silva',
    email: 'as@handy.com',
    password: '1234',
    google: null,
    facebook: null,
    twitter: null,
    picture: 'https://developer.apple.com/swift/images/swift-og.png',
    ratings: { quality: 4.5, price: 3.75, totalCount: 113 },
    created: '2020-01-13 10:00:00'
  },
  {
    id: 21, type: null, fullname: 'Lucas Brito', email: 'l172608@dac.unicamp.br', password: '1234', google: null, facebook: null, twitter: null, picture: 'https://avatars2.githubusercontent.com/u/12075737?s=460&u=c4bef0898bf7682bf6d54b2becc6adc70b45d895&v=4', accessToken: 'ABCDE', created: '2020-06-20 10:00:00'
  },
  {
    id: 22, type: null, fullname: 'Jonathan Dias', email: 'jd@handy.com', password: '1234', google: null, facebook: null, twitter: null, picture: 'https://s3.amazonaws.com/tinycards/image/c5b605125dd3a4685555bf56c37555ed', accessToken: 'DYFDR', created: '2020-06-20 10:00:00'
  },
  {
    id: 23, type: null, fullname: 'Guilherme Chaves', email: 'gc@handy.com', password: '1234', google: null, facebook: null, twitter: null, picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSJTcf_WTrUtjBYRzT6SYvg0UFo4lUT_DD14g&usqp=CAU', accessToken: 'KMHUH', created: '2020-06-20 10:00:00'
  },
  {
    id: 24, type: null, fullname: 'Juliana Soares', email: 'js@handy.com', password: '1234', google: null, facebook: null, twitter: null, picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcStven5jKcA1zUWGMBek6WVxfAnz_-2dzRSyQ&usqp=CAU', accessToken: 'VYFDT', created: '2020-06-20 10:00:00'
  },
  {
    id: 25, type: null, fullname: 'Priscila Santos', email: 'ps@handy.com', password: '1234', google: null, facebook: null, twitter: null, picture: 'https://www.dclick.com.br/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png', accessToken: 'SNJAD', created: '2020-06-20 10:00:00'
  },
  {
    id: 26, type: null, fullname: 'Beatriz Akemi', email: 'ba@handy.com', password: '1234', google: null, facebook: null, twitter: null, picture: 'https://www.essencialbella.com.br/wp-content/uploads/2017/12/person-3.jpeg', accessToken: 'SNJAD', created: '2020-06-20 10:00:00'
  },
];
exports.users = users;

const ratings = [
  {
    id: 1,
    providerId: 1,
    category: 'gardening',
    clientId: 22,
    created: '2020-02-24 11:00:00',
    content: 'Muito educado e o meu jardim ficou excelente! O trabalho dele é impecável..',
    quality: 5,
    price: 4
  },
  {
    id: 2,
    providerId: 1,
    category: 'gardening',
    clientId: 23,
    created: '2020-04-05 11:00:00',
    content: 'O preço é um pouco salgado, mas vale muito a pena.. de longe o melhor jardineiro que já vi! Cuidou das minhas plantas, é muito prestativo e ainda deixou tudo bem organizado, eu indico',
    quality: 5,
    price: 3.5
  },
  {
    id: 3,
    providerId: 1,
    category: 'gardening',
    clientId: 24,
    created: '2020-01-24 11:00:00',
    content: 'Excelente trabalho, minhas plantinhas parecem que estão até mais felizes',
    quality: 4,
    price: 5
  },
  {
    id: 4,
    providerId: 1,
    category: 'gardening',
    clientId: 25,
    created: '2020-03-09 11:00:00',
    content: 'Trabalha bem, nada de mais..',
    quality: 3,
    price: 3.5
  },
  {
    id: 5,
    providerId: 1,
    category: 'gardening',
    clientId: 26,
    created: '2020-05-17 11:00:00',
    content: 'Maravilhoso!',
    quality: 5,
    price: 4.75
  }
];
exports.ratings = ratings;

const services = [
  {
    id: 1,
    providerId: 1,
    category: 'gardening',
    clientId: 21,
    created: '2020-02-25 11:00:00'
  }
];
exports.services = services;
