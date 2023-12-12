import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export type contactType = {
  id: string;
  isOnTrial: boolean;
  isPurchased: boolean;
  isWannaTry: boolean;
  name: string;
  phoneNumber: string;
  time: number;
  wantToContact: boolean;
};

export type contactTableType = {
  id: string;
  name: string;
  phoneNumber: string;
  time: number;
  wantToContact: boolean;
  status: {
    isOnTrial: boolean;
    isPurchased: boolean;
    isWannaTry: boolean;
  };
};
export type contactsType = Array<contactType>;

export type contactsController = {
  data: contactsType;
  rawData: QueryDocumentSnapshot<DocumentData, DocumentData>[];
  totalElements: number;
};
export type supportedContactStatusList =
  | "isOnTrial"
  | "isPurchased"
  | "isWannaTry"
  | "noStatus"
  | "wantToContact"
  | "all";
