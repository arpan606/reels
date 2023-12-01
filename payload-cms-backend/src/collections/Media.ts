import path from "path";
import { CollectionConfig } from "payload/types";

const Media: CollectionConfig = {
    slug: "media",
    access: {
      create: () => true,
      read: () => true,
      update: () => true,
      delete: () => true
    },
    fields: [
      {
        name: "title",
        label: "Media Title",
        type: "text",
        required: true
      },
      {
        name: "type",
        label: "Type",
        type: "select",
        options: ["Image", "Video", "ShortVideo"],
        required: true
      }
    ],
    upload: {
      staticDir: path.resolve(
        __dirname,
        "../../../reels-frontend/src/media/"
      )
    }
  };
  
  export default Media;