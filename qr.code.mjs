import qr from "qrcode-terminal";
import "dotenv/config";

if (!process.env.PAYLOAD_PUBLIC_SERVER_URL) {
  throw new Error("missing [PAYLOAD_PUBLIC_SERVER_URL] env variable");
}

(async function () {
  if (process.env.PAYLOAD_PUBLIC_SERVER_URL !== "http://localhost:3000") {
    qr.generate(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}`, { small: true });
  }
  console.log(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}`);
})();
