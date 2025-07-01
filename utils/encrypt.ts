import crypto from "crypto";

const IV_LENGTH = 16; // AES-GCM standard IV length

export const encryptObject = (obj: object) => {
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const key = Buffer.from(process.env.CALLBACK_SECRET_KEY as string, "hex"); // Must be 32 bytes

    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
    const json = JSON.stringify(obj);

    let encrypted = cipher.update(json, "utf8", "hex");
    encrypted += cipher.final("hex");

    const authTag = cipher.getAuthTag();

    return {
      iv: iv.toString("hex"),
      data: encrypted,
      authTag: authTag.toString("hex"),
    };
  } catch (error) {
    throw error;
  }
};

export const decryptObject = (encrypted: {
  iv: string;
  data: string;
  authTag: string;
}) => {
  try {
    const key = Buffer.from(process.env.CALLBACK_SECRET_KEY as string, "hex");
    const iv = Buffer.from(encrypted.iv, "hex");
    const authTag = Buffer.from(encrypted.authTag, "hex");

    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted.data, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return JSON.parse(decrypted);
  } catch (error) {
    throw error;
  }
};
