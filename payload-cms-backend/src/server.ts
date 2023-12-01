import express from 'express';
import payload from 'payload';
import Posts from './collections/Post';

require('dotenv').config()
const app = express();
const cors = require('cors');

app.use(cors());

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  });

  app.get("/posts/videos/stream/:label/:pageNumber", async (req, res) => {
    try {

        // label->video/image/shortVideo
        // pageNumber-> for pagination
        const {label,pageNumber} = req.params;
        
        // check if the label should be of type (video,shortVideo,image)  
        if(!isValidStreamType(label))
          return res.status(400).json({ error: 'Invalid stream type' });

          
        // find post of label  
        const posts= await payload.find({
            collection: Posts.slug,
            limit: 1, // limit for page number
            page:Number(pageNumber),// page number
            where: {
              type: { equals: label }
            }
        });

        // return posts
        res.json(posts);
        return;
      
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

  function isValidStreamType(type: string){
    return ['image', 'video', 'shortVideo'].includes(type);
  }

  app.listen(3000)
}

start()

