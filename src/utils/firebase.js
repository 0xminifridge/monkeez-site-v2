import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  orderBy,
  limit,
  doc,
  collection,
  getDocs,
  startAfter,
  getDoc,
  where,
  getCountFromServer,
  endAt,
} from "firebase/firestore";
import { log } from "../helpers/console-logger";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);

const querySize = 20;

export async function getMonkeezForAddress(account) {
  log("getting monkeez for account: " + account);
  let monkeez = [];

  try {
    const monkeeRef = collection(db, "monkeez");

    let q = query(monkeeRef, where("owner", "==", account.toLowerCase()));

    let querySnapshot = await getDocs(q);

    const docs = querySnapshot.docs.map((doc) => doc.data());
    for (var doc of docs) {
      // messes with redux
      delete doc.timestamp;
      delete doc.updated;
      monkeez.push(doc);
    }
  } catch (err) {
    console.error(err);
  }

  return monkeez;
}

export async function getZoogzForAddress(account) {
  let zoogz = [];

  try {
    const monkeeRef = collection(db, "zoogz");

    let q = query(monkeeRef, where("owner", "==", account.toLowerCase()));

    let querySnapshot = await getDocs(q);

    const docs = querySnapshot.docs.map((doc) => doc.data());
    for (var doc of docs) {
      // messes with redux
      delete doc.timestamp;
      delete doc.updated;
      zoogz.push(doc);
    }
  } catch (err) {
    console.error(err);
  }

  return zoogz;
}

export async function getMonkeeForId(id) {
  const docRef = doc(db, "monkeez", id);
  const docSnap = await getDoc(docRef);

  let obj;

  if (docSnap.exists()) {
    log(("Document data:", docSnap.data()));
    obj = docSnap.data();
    obj.name = `Monkeez #${obj.id}`;
  } else {
    // doc.data() will be undefined in this case
    log("No such document!");
  }

  return obj;
}

export async function getZoogForId(id) {
  const docRef = doc(db, "zoogz", id.toString());
  const docSnap = await getDoc(docRef);

  let zoogObj;

  if (docSnap.exists()) {
    log("Document data:", docSnap.data());

    zoogObj = docSnap.data();
    delete zoogObj.timestamp;
    delete zoogObj.updated;
    delete zoogObj.created;
    zoogObj.name = `Zoog #${zoogObj.id}`;
  } else {
    // doc.data() will be undefined in this case
    log("No such document!");
  }

  return zoogObj;
}

export async function getDocumentForAddress(account) {
  let accountDoc = null;
  try {
    const docRef = doc(db, "accounts", account.toLowerCase());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      log(("Document data:", docSnap.data()));
      accountDoc = docSnap.data();
    }
  } catch (err) {
    console.error(err);
  }
  return accountDoc;
}

export async function getCompletedBattlesForZoog(tokenId) {
  log("entering getFinishedBattesForZoog", tokenId);

  let instances = [];

  try {
    const battleRef = collection(db, "zoog-battles");

    let q = query(
      battleRef,
      where("active", "==", false),
      where("acceptingId", "==", parseInt(tokenId))
    );

    let querySnapshot = await getDocs(q);

    const docs = querySnapshot.docs.map((doc) => doc.data());
    for (var doc of docs) {
      instances.push(doc);
    }

    q = query(
      battleRef,
      where("active", "==", false),
      where("zoogId", "==", parseInt(tokenId))
    );

    querySnapshot = await getDocs(q);

    const newDocs = querySnapshot.docs.map((doc) => doc.data());
    for (var doc of newDocs) {
      instances.push(doc);
    }
  } catch (err) {
    console.error(err);
  }

  return instances;
}

export async function queryZoogLeaderboardAscending(field, lastVisibleId) {
  log(
    `Getting ascending sorted zoogz with parameters - field: ${field}`,
    lastVisibleId
  );
  let zoogzList = [];
  const zoogRef = collection(db, "zoogz");

  let q;
  if (lastVisibleId !== null && lastVisibleId !== undefined) {
    const docRef = await getDoc(doc(zoogRef, `${lastVisibleId}`));
    q = query(
      zoogRef,
      orderBy(field, "desc"),
      limit(querySize),
      startAfter(docRef)
    );
  } else {
    q = query(zoogRef, orderBy(field), limit(querySize));
  }

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    // messes with redux
    delete doc.timestamp;
    delete doc.updated;
    let zoogData = doc.data();

    delete zoogData.timestamp;
    delete zoogData.updated;

    zoogData.name = `Zoog #${zoogData.id}`;

    zoogzList.push(zoogData);
  });

  return { list: zoogzList };
}

export async function queryZoogLeaderboardDescending(field, lastVisibleId) {
  log(
    `Getting descending sorted zoogz with parameters - field: ${field}`,
    lastVisibleId
  );
  let zoogzList = [];
  const zoogRef = collection(db, "zoogz");
  let q;
  if (lastVisibleId !== null && lastVisibleId !== undefined) {
    const docRef = await getDoc(doc(zoogRef, `${lastVisibleId}`));
    q = query(
      zoogRef,
      orderBy(field, "desc"),
      limit(querySize),
      startAfter(docRef)
    );
  } else {
    q = query(zoogRef, orderBy(field, "desc"), limit(querySize));
  }

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    // messes with redux
    delete doc.timestamp;
    delete doc.updated;
    let zoogData = doc.data();

    delete zoogData.timestamp;
    delete zoogData.updated;

    zoogData.name = `Zoog #${zoogData.id}`;

    zoogzList.push(zoogData);
  });

  return { list: zoogzList };
}

export async function getMaxZungleScore() {
  let maxScore = 0;
  try {
    const q = query(
      collection(db, "accounts"),
      orderBy("zScore", "desc"),
      limit(1)
    );
    let querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      maxScore = doc.data().zScore;
    });
  } catch (err) {
    console.error(err);
  }
  return maxScore;
}

export async function getRankForZungleScore(score) {
  let rank = 0;
  try {
    const q = query(
      collection(db, "accounts"),
      orderBy("zScore", "desc"),
      endAt(score)
    );
    const snapshot = await getCountFromServer(q);
    rank = snapshot.data().count;
  } catch (err) {
    console.error(err);
  }
  return rank;
}

export async function queryZScore(lastVisibleId) {
  let zscoreList = [];
  const collectionRef = collection(db, "accounts");

  let q;

  if (lastVisibleId !== null && lastVisibleId !== undefined) {
    const docRef = await getDoc(doc(collectionRef, `${lastVisibleId}`));
    q = query(
      collectionRef,
      orderBy("zScore", "desc"),
      limit(querySize),
      startAfter(docRef)
    );
  } else {
    q = query(collectionRef, orderBy("zScore", "desc"), limit(querySize));
  }

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    let data = doc.data();

    data["account"] = doc.id;

    delete data.timestamp;
    delete data.updated;

    zscoreList.push(data);
  });

  return { data: zscoreList };
}

export async function getLatestActiveBattles(field, lastVisibleId) {
  log("entering getLatestActiveBattles", field, lastVisibleId);

  let objList = [];
  const battleRef = collection(db, "zoog-battles");

  let q;

  if (lastVisibleId !== null && lastVisibleId !== undefined) {
    const docRef = await getDoc(doc(battleRef, `${lastVisibleId}`));
    q = query(
      battleRef,
      orderBy(field),
      limit(querySize),
      startAfter(docRef),
      where("active", "==", true)
    );
  } else {
    q = query(
      battleRef,
      orderBy(field),
      limit(querySize),
      where("active", "==", true)
    );
  }

  const querySnapshot = await getDocs(q);

  const docs = querySnapshot.docs.map((doc) => doc.data());
  for (var doc of docs) {
    // get each zoog for id
    delete doc.timestamp;
    delete doc.updated;
    delete doc.created;
    let zoogData = await getZoogForId(doc?.zoogId);

    // TODO: remove on go live
    // need to use zoog db

    let zoogObj = {
      type: zoogData?.type,
      owner: zoogData?.owner,
      aggression: doc?.aggression,
      toughness: doc?.toughness,
      smarts: doc?.smarts,
      vitality: doc?.vitality,
      name: `Zoog #${doc?.zoogId}`,
      wins: zoogData?.wins || 0,
      id: doc?.zoogId,
    };

    doc.zoog = zoogObj;

    objList.push(doc);
  }

  log("obj list:", objList);

  return { battles: objList, snapshot: querySnapshot };
}

export async function queryZoogBattleLog(lastVisibleId) {
  let battleList = [];
  const collectionRef = collection(db, "zoog-battles");

  let q;

  if (lastVisibleId !== null && lastVisibleId !== undefined) {
    const docRef = await getDoc(doc(collectionRef, `${lastVisibleId}`));
    q = query(
      collectionRef,
      orderBy("id", "desc"),
      where("active", "==", false),
      limit(querySize),
      startAfter(docRef)
    );
  } else {
    q = query(
      collectionRef,
      orderBy("id", "desc"),
      where("active", "==", false),
      limit(querySize)
    );
  }

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    let data = doc.data();

    battleList.push(data);
  });

  return { data: battleList };
}
