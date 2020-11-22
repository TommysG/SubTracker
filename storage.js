import admin from "./admin.js";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();

// const serviceAccount = {
//   type: process.env.type,
//   project_id: process.env.project_id,
//   private_key: process.env.private_key.replace(/\\n/g, "\n"),
//   client_email: process.env.client_email,
// };

const bucket = admin.storage().bucket();

// ---------> SAVE IMAGE TO FIREBASE STORAGE
const uploadImageToStorage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No image file");
    }
    let newFileName = `${Date.now()}_${file.originalname}`;

    let fileUpload = bucket.file(newFileName);

    // ------> UNIQUE ID TO HAVE ACCESS TO DOWNLOAD URL FIRESABASE STORAGE
    const uuid = uuidv4();

    fileUpload
      .createWriteStream({
        metadata: {
          metadata: {
            firebaseStorageDownloadTokens: uuid,
          },
        },
      })
      .on("error", function (err) {
        reject(err);
      })
      .on("finish", function (value) {
        const url = resolve(
          "https://firebasestorage.googleapis.com/v0/b/" +
            bucket.name +
            "/o/" +
            encodeURIComponent(newFileName) +
            "?alt=media&token=" +
            uuid
        );

        resolve(url);
      })
      .end(file.buffer);
  });
};

export { bucket };
export { uploadImageToStorage };
