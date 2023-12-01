import { CollectionConfig } from 'payload/types';


const Posts: CollectionConfig = {
    slug: "posts",
    access: {
      create: () => true,
      read: () => true,
      update: () => true,
      delete: () => true
    },
    fields: [
      {
        name: "title",
        label: "Post Title",
        type: "text",
        required: true
      },
      {
        name: "type",
        label: "Post Type",
        type: "select",
        options: [
          { label: "Image", value: "image" },
          { label: "Video", value: "video" },
          { label: "ShortVideo", value: "shortVideo" }
        ],
        required: true
      },
      {
        name: "media",
        label: "Media",
        type: "relationship",
        relationTo: "media",
        hasMany: true
      }
    ]
  };
  
  export default Posts;
