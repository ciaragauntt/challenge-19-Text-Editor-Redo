import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  //create a connection to the database
  const jateDB = await openDB('jate', 1);

  //create a new transaction and specify the database and data privileges 
  const tx = jateDB.transaction('jate', 'readwrite');

  //Open up the desired object store
  const store = tx.objectStore('jate');


  const request = store.put({ id: 1, value: content});

  //get confirmation of the request
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  //create a connection to the database and version we want to use
  const jateDB = await openDB('jate', 1);

  //create a new transaction and specify the database and data privileges
  const tx = jateDB.transaction('jate', 'readonly');

  //Open up the desired object store
  const store = tx.objectStore('jate');

  //get data from the database
  const request = store.get(1);

  //Get confirmation request
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();
