import PubNub from "pubnub";
export const pubnub = new PubNub({
  publishKey: process.env.PUBNUB_PUBLISH_KEY || "PUB_KEY",
  subscribeKey: process.env.PUBNUB_SUBSCRIBE_KEY || "SUB_KEY",
  secretKey: process.env.PUBNUB_SECRET_KEY || "SECRET_KEY",
  uuid: "term-ez",
});
