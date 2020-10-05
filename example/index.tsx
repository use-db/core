import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { db, Connection, RuntimeBinding, LocalStorageBinding } from '../';

const App = () => {
  // const connection = new Connection({
  //   bind: new RuntimeBinding(),
  // });
  const connection = new Connection({
    bind: new LocalStorageBinding(),
  });
  let input = [
    {
      id: 1,
      name: 'user1',
      email: 'user1@email.com',
    },
    {
      id: 2,
      name: 'user2',
      email: 'user2@email.com',
    },
    {
      id: 3,
      name: 'user3',
      email: 'user3@email.com',
    },
    {
      id: 4,
      name: 'user1',
      email: 'user3@email.com',
    },
  ];

  // input.forEach(val => {
  //   connection.query(db.users.create({ data: val }));
  // });
  const query3 = db.users.findMany({
    where: {
      // id: 4,
      name: 'user1',
    },
    select: ['name', 'email'],
  });
  let query4 = db.users.update({
    where: { id: 4 },
    data: { email: 'alice@prisma.io' },
  });
  // const query5 = db.users.delete({
  //   where: {
  //     name: 'user2',
  //   },
  //   select: ['name', 'email'],
  // });
  const query6 = db.users.deleteMany({
    where: {
      name: 'user1',
    },
  });
  const query7 = db.users.count({
    where: {
      name: 'user1',
    },
  });
  connection.query(query7).then((resp: any) => {
    console.log('find', resp);
  });
  // setTimeout(() => {
  //   connection.query(query3).then((resp: any) => {
  //     console.log(' find again', resp);
  //   });
  // }, 0);
  return (
    <div>
      Hey
      <button onClick={() => localStorage.clear()}>Clear</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
