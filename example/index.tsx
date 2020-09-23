import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { db, Connection, RuntimeBinding } from '../';

const App = () => {
  const connection = new Connection({
    bind: new RuntimeBinding(),
  });
  // connection.setBinding((data: any) => console.log('*** 🔥data2', data));
  // const query = db.users.get;
  const query1 = db.users.find(3);
  // const query2 = db.users.where('name', '=', 'name2');
  connection.query(
    db.users.insert({
      id: 3,
      name: 'user1',
      email: 'user1@email.com',
    })
  );
  connection.query(query1).then((resp: any) => {
    console.log('*** resp', resp);
  });
  return <div>Hey</div>;
};

ReactDOM.render(<App />, document.getElementById('root'));
