const { faker } = require('@faker-js/faker');
const fs = require('fs');

const db = require('./db.json');

function capitalizeFirstLetter(str) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

(() => {
  const data = {
    users: db.users,
    posts: [],
  };

  const MAX_USERS = data.users.length;

  for (let i = 0; i < 50; i++) {
    const titleWordsCount = faker.datatype.number({ min: 2, max: 7 });
    const bodyWordsCount = faker.datatype.number({ min: 3, max: 25 });
    const randomUserIndex = faker.datatype.number({ min: 0, max: MAX_USERS - 1 });
    const randomUser = data.users[randomUserIndex];

    data.posts.push({
      id: faker.datatype.uuid(),
      title: capitalizeFirstLetter(faker.lorem.words(titleWordsCount)),
      body: capitalizeFirstLetter(faker.lorem.words(bodyWordsCount)),
      createdAt: faker.date
        .between('2015-01-01T00:00:00.000Z', new Date().toISOString())
        .toISOString(),
      userId: randomUser.id,
    });
  }

  fs.writeFile(`${__dirname}/db.json`, JSON.stringify(data, null, 2), 'utf8', (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Data generated successfully!');
    }
  });
})();
