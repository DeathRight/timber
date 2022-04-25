import { queryField } from 'nexus';

import { TopicPayloadType } from '../../util/topics';

export const topicPayloadTypesQuery = queryField("topicPayloadTypes", {
  type: "TopicPayloadTypes",
  description: "Returns a JSON enum object of TopicPayloadType",
  resolve() {
    return JSON.stringify(TopicPayloadType);
  },
});
