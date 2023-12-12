import { supportedContactStatusList } from "./contactType";
import { supportedSubscriberStatusList } from "./subcriberType";

export type filterType = {
  phoneNumber: string | undefined;
  name: string | undefined;
  status: supportedContactStatusList;
};

export type filterSubscribersType = {
  phoneNumber: string | undefined;
  name: string | undefined;
  status: supportedSubscriberStatusList;
};
