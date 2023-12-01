import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Loader from './components/loader/loader';
import VideoCard from './components/videoCard/videoCard';
import { MediaDocument, Post } from './interface/media.interface';

function App() {

    const [card,setCard]=useState<Post[]>([]);
    const [page,setPage]=useState<number>(1);
    const [loading,setLoading]=useState<boolean>(true);
    const [contentType,setContentType]=useState<string>('shortVideo');
    const [hasNextPage,setNextPage]=useState<boolean>(true);

    // get content 
    const getContent=async()=>{
        setLoading(true);
        try{
            const response=await axios.get(`http://localhost:3000/posts/videos/stream/${contentType}/${page}`);
            const content:MediaDocument=response.data;
            setCard((prev:Post[])=>[...prev,...content.docs]);
            setLoading(false);
            // check if there is next page or not
            content.hasNextPage? setNextPage(true): setNextPage(false);
        }catch(err){
            console.error(err);
        }
    };

    useEffect(()=>{
        if(hasNextPage)
             getContent();
    },[page]);

    // infinite scrolling
    const handleInfinitteScroll=async()=>{
        try{
            if(window.innerHeight+ document.documentElement.scrollTop+1>=document.documentElement.scrollHeight)
                setPage((prev)=>prev+1);

        }catch(err){
            console.error(err);
        }
    };

    useEffect(()=>{
        window.addEventListener("scroll",handleInfinitteScroll);
        return ()=>window.removeEventListener('scroll',handleInfinitteScroll); 
    },[]);


  return (
    <div className="App">
        {!loading?(card && card.map((docs:Post)=>{return <VideoCard video={docs}/>})):(<Loader/>)}
    </div>
  );
}

export default App;
