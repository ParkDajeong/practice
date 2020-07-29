import React, { useEffect, useState } from "react";
import Axios from "axios";

function SideVideo() {
  const [SideVideos, setSideVideos] = useState([]);

  useEffect(() => {
    Axios.get("/api/video/getVideos") //
      .then((response) => {
        if (response.data.success) {
          setSideVideos(response.data.videos);
        } else {
          alert("영상 목록을 가져오기를 실패하였습니다.");
        }
      });
  }, []);

  const renderSideVideo = SideVideos.map((video, index) => {
    const min = Math.floor(video.duration / 60);
    const sec = Math.floor(video.duration - min * 60);

    return (
      <div key={index} style={{ display: "flex", marginBottom: "1rem", padding: "0 2rem" }}>
        <div style={{ width: "40%", marginRight: "1rem" }}>
          <a href={`/video/${video._id}`}>
            <img style={{ width: "100%", height: "100%" }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
          </a>
        </div>

        <div style={{ width: "50%" }}>
          <a href={`/video/${video._id}`} style={{ color: "gray" }}>
            <span style={{ fontSize: "1rem", color: "blakc" }}>{video.title}</span>
            <br />
            <span>{video.writer.name}</span>
            <br />
            <span>{video.view}</span>
            <br />
            <span>
              {min} : {sec}
            </span>
            <br />
          </a>
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <div style={{ marginTop: "3rem" }} />
      {renderSideVideo}
    </React.Fragment>
  );
}

export default SideVideo;
