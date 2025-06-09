import crypto from "crypto";

interface dataInterface {
  id: string;
  code: string;
  total: string;
  status: string;
}
const generateSignature = (data: dataInterface, secretKey: string) => {
  let text = "";

  if (typeof data === "object") {
    if (!data.id) {
      throw new Error("Data must contain an 'id' field");
    }
    if (!data.code) {
      throw new Error("Data must contain a 'code' field");
    }
    if (!data.total) {
      throw new Error("Data must contain a 'total' field");
    }
    if (!data.status) {
      throw new Error("Data must contain a 'status' field");
    }
    text = `${data.id}${data.code}${data.total}${data.status}`;
  } else {
    throw new Error("Data must be an object");
  }

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(text)
    .digest("hex");

  return signature;
};

export default generateSignature;
