
import { useNavigate } from "react-router-dom";

export default function VideoCard({ video }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/lesson/${video._id}`, { state: { video } }); // passes data via state
  };

  

  return (
    <div
      className="border p-4 rounded shadow cursor-pointer"
      onClick={handleClick}
    >
      <video
        className="w-full h-48 object-cover"
        poster={video.thumbnailUrl}
        controls={false}
      >
        <source src={video.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h3 className="mt-2 text-lg font-semibold">{video.title}</h3>
      {/* <h3>{video.description}</h3> */}
    </div>
  );
}
