import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export type subscriber = {
  email: string;
  id: string;
  isActive: boolean;
  isBlocked: boolean;
  name: string;
  time: number;
};
export type subscribersType = subscriber[];

export type subscriberTableType = {
  id: string;
  name: string;
  email: string;
  time: number;
  status: {
    isActive: boolean;
    isBlocked: boolean;
  };
};

export type subscribersController = {
  data: subscribersType;
  rawData: QueryDocumentSnapshot<DocumentData, DocumentData>[];
  totalElements: number;
};
export type supportedSubscriberStatusList = "isActive" | "isBlocked";
