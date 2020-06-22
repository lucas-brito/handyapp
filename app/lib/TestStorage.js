const users = [
  {
    id: 1, type: 'provider', categories: ['cleaning', 'gardening', 'electricity'], fullname: 'José Carvalho', email: 'jc@handy.com', password: '1234', google: null, facebook: null, twitter: null, picture: 'https://kotlinlang.org/assets/images/open-graph/kotlin_250x250.png', ratings: { quality: 4.75, price: 4, totalCount: 122 }
  },
  {
    id: 2, type: 'provider', categories: ['gardening', 'pumbling', 'painting'], fullname: 'Luiz da Silva', email: 'ls@handy.com', password: '1234', google: null, facebook: null, twitter: null, picture: 'https://miro.medium.com/max/400/1*mrOXGyIa3BlPK80peLmEbA.png', ratings: { quality: 4.5, price: 4.75, totalCount: 38 }
  },
  {
    id: 3, type: 'provider', categories: ['pumbling', 'gardening', 'cleaning'], fullname: 'Marcos Oliveira', email: 'mo@handy.com', password: '1234', google: null, facebook: null, twitter: null, picture: 'https://secure.meetupstatic.com/photos/event/4/a/b/5/600_466219125.jpeg', ratings: { quality: 4.5, price: 5, totalCount: 12 }
  },
  {
    id: 4, type: 'provider', categories: ['electricity', 'cleaning'], fullname: 'Sergio Moraes', email: 'sm@handy.com', password: '1234', google: null, facebook: null, twitter: null, picture: 'https://dwglogo.com/wp-content/uploads/2018/03/Dart_logo.png', ratings: { quality: 4.5, price: 3.75, totalCount: 134 }
  },
  {
    id: 5, type: 'provider', categories: ['painting', 'electricity'], fullname: 'Paula Ferreira', email: 'pf@handy.com', password: '1234', google: null, facebook: null, twitter: null, picture: 'https://developer.apple.com/swift/images/swift-og.png', ratings: { quality: 4.5, price: 3.75, totalCount: 113 }
  },
  {
    id: 6, type: 'provider', categories: ['cleaning', 'gardening', 'painting'], fullname: 'Guilherme Diogo', email: 'gd@handy.com', password: '1234', google: null, facebook: null, twitter: null, picture: 'https://secure.meetupstatic.com/photos/event/4/a/b/5/600_466219125.jpeg', ratings: { quality: 4.75, price: 4, totalCount: 122 }
  },
  {
    id: 7, type: 'provider', categories: ['gardening', 'pumbling'], fullname: 'Isaac Oliver', email: 'io@handy.com', password: '1234', google: null, facebook: null, twitter: null, picture: 'https://miro.medium.com/max/400/1*mrOXGyIa3BlPK80peLmEbA.png', ratings: { quality: 4.5, price: 4.75, totalCount: 38 }
  },
  {
    id: 8, type: 'provider', categories: ['pumbling', 'painting'], fullname: 'Benjamin Yago', email: 'by@handy.com', password: '1234', google: null, facebook: null, twitter: null, picture: 'https://kotlinlang.org/assets/images/open-graph/kotlin_250x250.png', ratings: { quality: 4.5, price: 5, totalCount: 12 }
  },
  {
    id: 9, type: 'provider', categories: ['electricity', 'cleaning'], fullname: 'Brenda Sophia', email: 'bs@handy.com', password: '1234', google: null, facebook: null, twitter: null, picture: 'https://kotlinlang.org/assets/images/open-graph/kotlin_250x250.png', ratings: { quality: 4.5, price: 3.75, totalCount: 134 }
  },
  {
    id: 10, type: 'provider', categories: ['painting', 'gardening', 'pumbling'], fullname: 'Danilo Yuri', email: 'dy@handy.com', password: '1234', google: null, facebook: null, twitter: null, picture: 'https://secure.meetupstatic.com/photos/event/4/a/b/5/600_466219125.jpeg', ratings: { quality: 4.5, price: 3.75, totalCount: 113 }
  },
  {
    id: 11, type: 'provider', categories: ['cleaning', 'painting'], fullname: 'Arthur Elias', email: 'ae@handy.com', password: '1234', google: null, facebook: null, twitter: null, picture: 'https://kotlinlang.org/assets/images/open-graph/kotlin_250x250.png', ratings: { quality: 4.75, price: 4, totalCount: 122 }
  },
  {
    id: 12, type: 'provider', categories: ['gardening', 'cleaning'], fullname: 'Isabel Louise', email: 'il@handy.com', password: '1234', google: null, facebook: null, twitter: null, picture: 'https://developer.apple.com/swift/images/swift-og.png', ratings: { quality: 4.5, price: 4.75, totalCount: 38 }
  },
  {
    id: 13, type: 'provider', categories: ['pumbling', 'electricity'], fullname: 'Lorenzo Andre', email: 'la@handy.com', password: '1234', google: null, facebook: null, twitter: null, picture: 'https://secure.meetupstatic.com/photos/event/4/a/b/5/600_466219125.jpeg', ratings: { quality: 4.5, price: 5, totalCount: 12 }
  },
  {
    id: 14, type: 'provider', categories: ['electricity', 'pumbling'], fullname: 'José Maciel', email: 'jm@handy.com', password: '1234', google: null, facebook: null, twitter: null, picture: 'https://dwglogo.com/wp-content/uploads/2018/03/Dart_logo.png', ratings: { quality: 4.5, price: 3.75, totalCount: 134 }
  },
  {
    id: 15, type: 'provider', categories: ['painting', 'gardening', 'electricity'], fullname: 'Miguel Duarte', email: 'md@handy.com', password: '1234', google: null, facebook: null, twitter: null, picture: 'https://developer.apple.com/swift/images/swift-og.png', ratings: { quality: 4.5, price: 3.75, totalCount: 113 }
  },
  {
    id: 16, type: 'provider', categories: ['cleaning', 'painting'], fullname: 'Cauã Dantas', email: 'cd@handy.com', password: '1234', google: null, facebook: null, twitter: null, picture: 'https://kotlinlang.org/assets/images/open-graph/kotlin_250x250.png', ratings: { quality: 4.75, price: 4, totalCount: 122 }
  },
  {
    id: 17, type: 'provider', categories: ['gardening', 'cleaning'], fullname: 'Dahas Abrahim', email: 'da@handy.com', password: '1234', google: null, facebook: null, twitter: null, picture: 'https://developer.apple.com/swift/images/swift-og.png', ratings: { quality: 4.5, price: 4.75, totalCount: 38 }
  },
  {
    id: 18, type: 'provider', categories: ['pumbling', 'electricity'], fullname: 'Isabelle Rocha', email: 'ir@handy.com', password: '1234', google: null, facebook: null, twitter: null, picture: 'https://secure.meetupstatic.com/photos/event/4/a/b/5/600_466219125.jpeg', ratings: { quality: 4.5, price: 5, totalCount: 12 }
  },
  {
    id: 19, type: 'provider', categories: ['electricity', 'pumbling'], fullname: 'Erick Fernando', email: 'ef@handy.com', password: '1234', google: null, facebook: null, twitter: null, picture: 'https://dwglogo.com/wp-content/uploads/2018/03/Dart_logo.png', ratings: { quality: 4.5, price: 3.75, totalCount: 134 }
  },
  {
    id: 20, type: 'provider', categories: ['painting', 'gardening', 'electricity'], fullname: 'Antônio da Silva', email: 'as@handy.com', password: '1234', google: null, facebook: null, twitter: null, picture: 'https://developer.apple.com/swift/images/swift-og.png', ratings: { quality: 4.5, price: 3.75, totalCount: 113 }
  },
  {
    id: 21, type: null, fullname: 'Lucas Brito', email: 'l172608@dac.unicamp.br', password: '1234', google: null, facebook: null, twitter: null, picture: 'https://developer.apple.com/swift/images/swift-og.png', accessToken: 'ABCDE'
  }
];
exports.users = users;
