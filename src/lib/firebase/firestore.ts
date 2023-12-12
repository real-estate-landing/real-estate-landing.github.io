import {
  collection,
  query,
  getDocs,
  doc,
  updateDoc,
  Timestamp,
  where,
  DocumentData,
  Query,
  setDoc,
  getDoc,
  CollectionReference,
  deleteDoc,
  orderBy,
  limit,
  QueryDocumentSnapshot,
  startAfter,
  getCountFromServer,
} from "firebase/firestore";
import { v4 as uuidV4 } from "uuid";
import { db } from "./firebase";
import {
  contactType,
  contactsType,
  supportedContactStatusList,
} from "../../types/contactType";
import {
  subscriber,
  subscribersType,
  supportedSubscriberStatusList,
} from "../../types/subcriberType";

// extra functions;
export function checkEmailIsValid(email: string) {
  const expr = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (expr.test(email)) {
    return "valid email address";
  } else {
    return null;
  }
}
export function applyQueryFilters(
  q: Query<DocumentData, DocumentData>,
  {
    phoneNumber,
    name,
    email,
    status,
  }: {
    phoneNumber?: string;
    name?: string;
    email?: string;
    status?: supportedContactStatusList | supportedSubscriberStatusList;
  }
) {
  if (phoneNumber) {
    q = query(q, where("phoneNumber", "==", phoneNumber));
  }
  if (name) {
    q = query(q, where("name", "==", name));
  }
  if (email) {
    q = query(q, where("email", "==", email));
  }

  switch (status) {
    case "isOnTrial":
      {
        q = query(q, where("isOnTrial", "==", true));
      }
      break;
    case "isPurchased":
      {
        q = query(q, where("isPurchased", "==", true));
      }
      break;
    case "isWannaTry":
      {
        q = query(q, where("isWannaTry", "==", true));
      }
      break;
    case "wantToContact":
      {
        q = query(q, where("wantToContact", "==", true));
      }
      break;
    case "noStatus":
      {
        q = query(
          q,
          where("isOnTrial", "==", false),
          where("isPurchased", "==", false),
          where("isWannaTry", "==", false)
        );
      }
      break;
    case "isActive":
      {
        q = query(q, where("isActive", "==", true));
      }
      break;
    case "isBlocked":
      {
        q = query(q, where("isBlocked", "==", true));
      }
      break;
    default: {
      return q;
    }
  }

  return q;
}
export async function checkUserInDb(
  phoneNumber?: string,
  name?: string,
  email?: string,
  docName: string = "users"
) {
  let q = query(collection(db, docName));
  q = applyQueryFilters(q, {
    phoneNumber,
    name,
    email,
  });
  const results = await getDocs(q);
  return results?.docs?.map((doc) => {
    return {
      id: doc.id,
      ...(doc.data() as { name: string; phoneNumber: string; email: string }),
    };
  });
}
export async function returnAllDocsCount(
  collectionName?: string | undefined,
  queryFilter?: Query<DocumentData, DocumentData>
) {
  const col: CollectionReference<DocumentData, DocumentData> | undefined =
    collectionName ? collection(db, collectionName) : undefined;
  const qFilter = query(
    col ?? (queryFilter as Query<DocumentData, DocumentData>)
  );
  const snapshot = await getCountFromServer(qFilter);
  return snapshot.data().count;
}

// crud functions;
export function updateUserStatus(
  id: string,
  status: "trial" | "purchased" | "wannaTry" | undefined
) {
  const updatingUser = doc(db, "users", id);
  const statusPack =
    status === "trial"
      ? {
          isOnTrial: true,
          isPurchased: false,
          isWannaTry: false,
        }
      : status === "purchased"
      ? {
          isOnTrial: false,
          isPurchased: true,
          isWannaTry: false,
        }
      : status === "wannaTry"
      ? {
          isOnTrial: false,
          isPurchased: false,
          isWannaTry: true,
        }
      : {
          isOnTrial: false,
          isPurchased: false,
          isWannaTry: false,
        };
  console.log("server", id, statusPack);
  return updateDoc(updatingUser, {
    ...statusPack,
  });
}
export function updateSubscriberStatus(
  id: string,
  status: supportedSubscriberStatusList
) {
  const updatingUser = doc(db, "subscribers", id);
  const statusPack =
    status === "isBlocked"
      ? {
          isBlocked: true,
          isActive: false,
        }
      : {
          isActive: true,
          isBlocked: false,
        };
  console.log("server", id, statusPack);
  return updateDoc(updatingUser, {
    ...statusPack,
  });
}
export function updateUserCalled(id: string) {
  const updatingUser = doc(db, "users", id);

  return updateDoc(updatingUser, {
    wantToContact: false,
  });
}
export function deleteSelectedUsers(
  collectionName: string,
  ids: readonly string[]
): void {
  for (const id of ids) {
    const docRef = doc(collection(db, collectionName), id);
    deleteDoc(docRef);
  }
}

// data functions
export async function returnPaginatedContacts(
  limitOfDocs: number,
  page: "back" | "forward" | undefined,
  startingAt?: QueryDocumentSnapshot<DocumentData, DocumentData>,
  searchByPhoneNumber?: string,
  searchByName?: string,
  status?: supportedContactStatusList
) {
  const col = collection(db, "users");
  const originQuery = query(col, orderBy("time", "desc"));
  let initialQuery = query(originQuery, limit(limitOfDocs));

  const totalElements = await returnAllDocsCount(
    undefined,
    applyQueryFilters(originQuery, {
      phoneNumber: searchByPhoneNumber,
      name: searchByName,
      status: status,
    })
  );
  const rawData: QueryDocumentSnapshot<DocumentData, DocumentData>[] = [];
  const users: contactsType = [];

  if (startingAt) {
    console.log({ startingAt });
    initialQuery =
      page === "forward"
        ? query(
            col,
            orderBy("time", "desc"),
            limit(limitOfDocs),
            startAfter(startingAt)
          )
        : query(
            col,
            orderBy("time", "asc"),
            limit(limitOfDocs),
            where("time", ">", startingAt.data()?.time)
          );
  }

  initialQuery = applyQueryFilters(initialQuery, {
    phoneNumber: searchByPhoneNumber,
    name: searchByName,
    status: status,
  });
  const rawDocs = await getDocs(initialQuery);
  rawDocs.forEach((doc) => {
    if (page === "back") {
      rawData.unshift(doc);
      users.unshift({
        id: doc.id,
        ...doc.data(),
      } as contactType);
    } else {
      rawData.push(doc);
      users.push({
        id: doc.id,
        ...doc.data(),
      } as contactType);
    }
  });
  return {
    data: users,
    rawData,
    totalElements,
  };
}
export async function returnPaginatedSubscribers(
  limitOfDocs: number,
  page: "back" | "forward" | undefined,
  startingAt?: QueryDocumentSnapshot<DocumentData, DocumentData>,
  searchByEmail?: string,
  searchByName?: string,
  status?: supportedSubscriberStatusList | undefined
) {
  const col = collection(db, "subscribers");
  const originQuery = query(col, orderBy("time", "desc"));
  let initialQuery = query(originQuery, limit(limitOfDocs));

  const totalElements = await returnAllDocsCount(
    undefined,
    applyQueryFilters(originQuery, {
      email: searchByEmail,
      name: searchByName,
      status: status,
    })
  );
  const rawData: QueryDocumentSnapshot<DocumentData, DocumentData>[] = [];
  const users: subscribersType = [];

  if (startingAt) {
    console.log({ startingAt });
    initialQuery =
      page === "forward"
        ? query(
            col,
            orderBy("time", "desc"),
            limit(limitOfDocs),
            startAfter(startingAt)
          )
        : query(
            col,
            orderBy("time", "asc"),
            limit(limitOfDocs),
            where("time", ">", startingAt.data()?.time)
          );
  }

  initialQuery = applyQueryFilters(initialQuery, {
    email: searchByEmail,
    name: searchByName,
    status: status,
  });
  const rawDocs = await getDocs(initialQuery);
  rawDocs.forEach((doc) => {
    if (page === "back") {
      rawData.unshift(doc);
      users.unshift({
        id: doc.id,
        ...doc.data(),
      } as subscriber);
    } else {
      rawData.push(doc);
      users.push({
        id: doc.id,
        ...doc.data(),
      } as subscriber);
    }
  });
  return {
    data: users,
    rawData,
    totalElements,
  };
}
export async function addUserWhoWantsToTalk(phoneNumber: string, name: string) {
  const users = await checkUserInDb(phoneNumber);
  if (phoneNumber) {
    if (users?.[0]?.id) {
      const updatingUser = doc(db, "users", users?.[0]?.id);
      return updateDoc(updatingUser, {
        wantToContact: true,
        time: Timestamp.now().toDate().getTime(),
      });
    } else {
      const namesBase = doc(db, "contactsName", "uNJW3Y2cU8nbX6u9gzP5");
      const phonesBase = doc(db, "contactsPhone", "9Pn6dgJeRyjH9XVIW0Qj");
      const names = await getDoc(namesBase);
      const phones = await getDoc(phonesBase);
      const allNames = names.data()?.values.split(";");
      const allPhones = phones.data()?.values.split(";");
      allNames.push(name);
      allPhones.push(phoneNumber);
      console.log("trynames", names.data()?.values);
      console.log("tryphones", phones.data()?.values);
      setDoc(namesBase, {
        values: allNames.join(";"),
      });
      setDoc(phonesBase, {
        values: allPhones.join(";"),
      });
      const newUser = doc(db, "users", uuidV4());
      return setDoc(newUser, {
        name,
        phoneNumber,
        isOnTrial: false,
        isPurchased: false,
        isWannaTry: false,
        wantToContact: true,
        time: Timestamp.now().toDate().getTime(),
      });
    }
  } else {
    throw new Error("error: invalid_phone");
  }
}

export async function addUserForNews(email: string, name: string) {
  const checkEmail = checkEmailIsValid(email);

  const users = await checkUserInDb(undefined, undefined, email, "subscribers");
  console.log({ checkEmail });
  if (checkEmail) {
    if (users?.[0]?.id) {
      const updatingUser = doc(db, "subscribers", users?.[0].id);
      return updateDoc(updatingUser, {
        isActive: true,
      });
    } else {
      const newUser = doc(db, "subscribers", uuidV4());
      return setDoc(newUser, {
        name,
        email,
        isActive: true,
        isBlocked: false,
        time: Timestamp.now().toDate().getTime(),
      });
    }
  } else {
    throw new Error("error: invalid_email");
  }
}
