import { useState, useEffect } from "react";
import "./upload.css";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [trailer, setTrailer] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailS, setThumbnailS] = useState("");
  const [actress, setActress] = useState("");
  const [studio, setStudio] = useState("");
  const [series, setSeries] = useState("");
  const [date, setDate] = useState("");

  // Suggestions
  const [actressList, setActressList] = useState([]);
  const [studioList, setStudioList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);

  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.BASE_URL}data/videos.json`
        );

        if (!res.ok) return;

        const videos = await res.json();

        // Actress
        const actresses = [
          ...new Set(
            videos.flatMap((v) =>
              Array.isArray(v.actress) ? v.actress : []
            )
          ),
        ].sort();

        // Studio
        const studios = [
          ...new Set(
            videos
              .map((v) => v.studio)
              .filter(Boolean)
          ),
        ].sort();

        // Series
        const serieses = [
          ...new Set(
            videos
              .map((v) => v.series)
              .filter(Boolean)
          ),
        ].sort();

        setActressList(actresses);
        setStudioList(studios);
        setSeriesList(serieses);
      } catch (err) {
        console.error(err);
      }
    };

    loadSuggestions();
  }, []);

  const upload = async () => {
    const res = await fetch(`${import.meta.env.BASE_URL}data/videos.json`);

    if (!res.ok) {
      alert("videos.json not found!");
      return;
    }

    const videos = await res.json();

    const newVideo = {
      id: 1,
      title,
      src: url,
      trailer,
      thumbnail,
      thumbnail_s: thumbnailS,
      actress: actress
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
      studio,
      series,
      date,
    };

    videos.unshift(newVideo);

    videos.forEach((video, index) => {
      video.id = index + 1;
    });

    const blob = new Blob([JSON.stringify(videos, null, 2)], {
      type: "application/json",
    });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "videos.json";
    a.click();

    URL.revokeObjectURL(a.href);

    alert("videos.json downloaded successfully!");

    setTitle("");
    setUrl("");
    setTrailer("");
    setThumbnail("");
    setThumbnailS("");
    setActress("");
    setStudio("");
    setSeries("");
    setDate("");
  };

  return (
    <div className="upload-page">
      <div className="upload-card">
        <h2>Upload Video</h2>

        <div className="upload-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter Video Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="upload-group">
          <label>Video URL</label>
          <input
            type="text"
            placeholder="Paste Video URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div className="upload-group">
          <label>Trailer URL</label>
          <input
            type="text"
            placeholder="Paste Trailer URL"
            value={trailer}
            onChange={(e) => setTrailer(e.target.value)}
          />
        </div>

        <div className="upload-group">
          <label>Thumbnail URL</label>
          <input
            type="text"
            placeholder="Paste Thumbnail URL"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
          />
        </div>

        <div className="upload-group">
          <label>Small Thumbnail URL</label>
          <input
            type="text"
            placeholder="Paste Small Thumbnail URL"
            value={thumbnailS}
            onChange={(e) => setThumbnailS(e.target.value)}
          />
        </div>

        <div className="upload-group">
          <label>Actress (comma separated)</label>
          <input
            list="actress-list"
            type="text"
            placeholder="Jade Kush, Emily"
            value={actress}
            onChange={(e) => setActress(e.target.value)}
          />

          <datalist id="actress-list">
            {actressList.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
        </div>

        <div className="upload-group">
          <label>Studio</label>
          <input
            list="studio-list"
            type="text"
            placeholder="Studio Name"
            value={studio}
            onChange={(e) => setStudio(e.target.value)}
          />

          <datalist id="studio-list">
            {studioList.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
        </div>

        <div className="upload-group">
          <label>Series (Optional)</label>
          <input
            list="series-list"
            type="text"
            placeholder="Series Name"
            value={series}
            onChange={(e) => setSeries(e.target.value)}
          />

          <datalist id="series-list">
            {seriesList.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
        </div>

        <div className="upload-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button className="upload-btn" onClick={upload}>
          Upload
        </button>
      </div>
    </div>
  );
}