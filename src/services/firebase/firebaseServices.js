import firestore from '@react-native-firebase/firestore';

export async function saveData(collection, doc, jsonObject) {
  await firestore()
    .collection(collection)
    .doc(doc)
    .set(jsonObject, {merge: true})
    .catch(function (error) {
      console.error('Error writing document: ', error);
    });
  console.log('Document successfully written!');
}

export async function getAllOfCollection(collection) {
  let data = [];
  let querySnapshot = await firestore().collection(collection).get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      data.push(doc.data());
    } else {
      console.log('No document found!');
    }
  });
  return data;
}

export async function deleteCollection(collection, doc) {
  let querySnapshot = await firestore()
    .collection(collection)
    .doc(doc)
    .delete()
    .then(res => {
      console.log('User deleted!');
    });
  return querySnapshot;
}
export async function deleteUser(uid) {
  let querySnapshot = await firestore()
    .collection('notifications')
    .where('to', '==', uid)
    .get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      firestore()
        .collection('notifications')
        .doc(doc.id)
        .delete()
        .then(res => {
          console.log('notification deleted!');
        });
    } else {
      console.log('No document found!');
    }
  });
  let querySnapshot1 = await firestore()
    .collection('workOut')
    .where('phoneNumber', '==', uid)
    .get();
  querySnapshot1.forEach(function (doc) {
    if (doc.exists) {
      firestore()
        .collection('workOut')
        .doc(doc.id)
        .delete()
        .then(res => {
          console.log('workout deleted!');
        });
    } else {
      console.log('No document found!');
    }
  });
  let querySnapshot2 = await firestore()
    .collection('chat')
    .where('reciverId', '==', uid)
    .where('senderId', '==', uid)
    .get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      firestore()
        .collection('chat')
        .doc(doc.id)
        .delete()
        .then(res => {
          console.log('chat deleted!');
        });
    } else {
      console.log('No document found!');
    }
  });
  return querySnapshot;
}
export async function getAllOfCollectionwhere(collection, key, id) {
  let data = [];
  let querySnapshot = await firestore()
    .collection(collection)
    .where(key, '==', id)
    .get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      data.push(doc.data());
    } else {
      console.log('No document found!');
    }
  });
  return data;
}
export async function getAllOfCollectionwhere1(collection, key, id) {
  let data = [];
  let querySnapshot = await firestore()
    .collection(collection)
    .where(key, 'array-contains', id)
    .get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      data.push(doc.data());
    } else {
      console.log('No document found!');
    }
  });
  return data;
}
export async function getAllOfCollectiondoublewhereIn(collection, key,id,key1, idsArray,) {
  let data = [];
  let querySnapshot = await firestore()
    .collection(collection)
    .where(key, '==', id)
    .where(key1, 'in', idsArray)
    .get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      data.push(doc.data());
    } else {
      console.log('No document found!');
    }
  });
  return data;
}
export async function getAllOfCollectiondoublewhere(
  collection,
  key,
  id,
  key1,
  id1,
) {
  let data = [];
  let querySnapshot = await firestore()
    .collection(collection)
    .where(key, '==', id)
    .where(key1, '==', id1)
    .get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      data.push(doc.data());
    } else {
      console.log('No document found!');
    }
  });
  return data;
}
export async function getAllOfCollectiondoublewhere3(
  collection,
  key,
  id,
  key1,
  id1,
  key2,
  id2,
) {
  let data = [];
  let querySnapshot = await firestore()
    .collection(collection)
    .where(key, '==', id)
    .where(key1, '==', id1)
    .where(key2, '==', id2)
    .get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      data.push(doc.data());
    } else {
      console.log('No document found!');
    }
  });
  return data;
}
export async function arryAddmessage(collection, doc, value) {
  console.log('addMessage', value);
  await firestore()
    .collection(collection)
    .doc(doc)
    .set({message: firestore.FieldValue.arrayUnion(value)}, {merge: true})
    .then(async e => {
      console.log('submit', e);
    })
    .catch(function (error) {
      console.error('Error writing document: ', error);
    });
}
export async function addBlockedUser(collection, doc, value) {
  console.log('addMessage', value);
  await firestore()
    .collection(collection)
    .doc(doc)
    .set({blockedUser: firestore.FieldValue.arrayUnion(value)}, {merge: true})
    .then(async e => {
      console.log('submit', e);
    })
    .catch(function (error) {
      console.error('Error writing document: ', error);
    });
}
export async function arryAdd(collection, doc, value) {
  await firestore()
    .collection(collection)
    .doc(doc)
    .update({requestedToJoin: firestore.FieldValue.arrayUnion(value)})
    .then(async e => {
      console.log(e);
    })
    .catch(function (error) {
      console.error('Error writing document: ', error);
    });
}
export async function requestedToJoinDelete(collection, doc, value) {
  await firestore()
    .collection(collection)
    .doc(doc)
    .update({
      requestedToJoin: firestore.FieldValue.arrayRemove(value),
    })
    .then(async e => {
      console.log('Document Write successFully', e);
    })
    .catch(e => {
      console.log(e);
    });
}
export async function addToAccept(collection, doc, value) {
  await firestore()
    .collection(collection)
    .doc(doc)
    .update({accept: firestore.FieldValue.arrayUnion(value)})
    .then(async e => {
      console.log('Document Write successFully', e);
    })
    .catch(function (error) {
      console.error('Error writing document: ', error);
    });
}
export async function saveDataSub(collection, doc, subCol, subid, jsonObject) {
  let success = false;
  await firestore()
    .collection(collection)
    .doc(doc)
    .collection(subCol)
    .doc(subid)
    .set(jsonObject, {merge: true})
    .then(e => {
      console.log(e);
      success = true;
    })
    .catch(function (error) {
      console.error('Error writing document: ', error);
      success = false;
    });
  return success;
}
export async function arryAddprofile(collection, doc, value) {
  await firestore()
    .collection(collection)
    .doc(doc)
    .set({profile: firestore.FieldValue.arrayUnion(value)}, {merge: true})
    .then(async e => {
      console.log(e);
    })
    .catch(function (error) {
      console.error('Error writing document: ', error);
    });
}
export async function getAllOfCollectionwhereInclude(collection, key, id) {
  let data = [];
  let querySnapshot = await firestore()
    .collection(collection)
    .where(key, 'array-contains', id)
    .get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      data.push(doc.data());
    } else {
      console.log('No document found!');
    }
  });
  return data;
}

export async function requestRemove(collection, doc, value) {
  await firestore()
    .collection(collection)
    .doc(doc)
    .update({requestedToJoin: value})
    .then(async e => {
      console.log(e);
    })
    .catch(function (error) {
      console.error('Error writing document: ', error);
    });
}
