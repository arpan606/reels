import { Media, Post } from '../../interface/media.interface';
import './videoCard.css';

interface VideoCardProps {
    video: Post; 
  }

  function VideoCard({ video }: VideoCardProps) {
    return (
      <div className="video-card">
        {video.media.map((media: Media) => (
          <div key={media.id}>
            <h1>{video.title}</h1>
            {media.type === 'Image' ? (
              <img key={media.id} src={`../..${media.url}`} alt={media.title} />
            ) : (
              <video key={media.id} controls>
                <source src={`../${media.url}`} type={media.mimeType} />
              </video>
            )}
          </div>
        ))}
      </div>
    );
  }

export default VideoCard;
