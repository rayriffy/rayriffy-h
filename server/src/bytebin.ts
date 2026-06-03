import { secretbox, randomBytes } from "tweetnacl";
import { decodeUTF8, encodeUTF8, encodeBase64, decodeBase64 } from "tweetnacl-util";

const key = "Bo9ZWpLimG6aOCV6absebNSKCrKk0qLxX2VbSze4LGI=";

export const upload = async (content: string): Promise<string> => {
  const nonce = randomBytes(secretbox.nonceLength);
  const keyUint8Array = decodeBase64(key);
  const messageUint8 = decodeUTF8(content);
  const box = secretbox(messageUint8, nonce, keyUint8Array);

  console.log("box");

  const fullMessage = new Uint8Array(nonce.length + box.length);
  fullMessage.set(nonce);
  fullMessage.set(box, nonce.length);

  const base64FullMessage = encodeBase64(fullMessage);
  const response = await fetch("https://api.pastes.dev/post", {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
      "User-Agent": "RiffyH (github.com/rayriffy/rayriffy-h)",
    },
    body: base64FullMessage,
  });

  if (!response.ok) throw new Error("failed to upload content");

  const data = response.json() as Promise<{ key: string }>;
  return (await data).key;
};

export const download = async (code: string): Promise<string> => {
  const response = await fetch(`https://api.pastes.dev/${code}`);

  if (!response.ok) throw new Error(`failed to download content with code ${code}`);

  const encryptedContent = await response.text();

  const keyUint8Array = decodeBase64(key);
  const messageWithNonceAsUint8Array = decodeBase64(encryptedContent);
  const nonce = messageWithNonceAsUint8Array.slice(0, secretbox.nonceLength);
  const message = messageWithNonceAsUint8Array.slice(
    secretbox.nonceLength,
    encryptedContent.length,
  );

  const decrypted = secretbox.open(message, nonce, keyUint8Array);

  if (!decrypted) throw new Error("could not decrypt message");

  return encodeUTF8(decrypted);
};
