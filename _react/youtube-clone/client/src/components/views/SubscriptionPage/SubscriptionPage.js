import React, { useEffect, useState } from "react";
import { Card, Avatar, Col, Typography, Row } from "antd";
import Axios from "axios";
import moment from "moment";

const { Title } = Typography;
const { Meta } = Card;

function SubscriptionPage() {
  const [Videos, setVideos] = useState([]);
  const subscriptionVariable = { userFrom: localStorage.getItem("userId") };

  useEffect(() => {
    Axios.post("/api/video/getSubscriptionVideos", subscriptionVariable) //
      .then((response) => {
        if (response.data.success) {
          setVideos(response.data.videos);
        } else {
          alert("영상 목록을 가져오기를 실패하였습니다.");
        }
      });
  }, []);

  const renderCards = Videos.map((video, index) => {
    const min = Math.floor(video.duration / 60);
    const sec = Math.floor(video.duration - min * 60);

    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <a href={`/video/${video._id}`}>
          <div style={{ position: "relative" }}>
            <img style={{ width: "100%" }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
            <div className="duration">
              <span>
                {min} : {sec}
              </span>
            </div>
          </div>
        </a>
        <br />
        <Meta //
          avatar={<Avatar src={video.writer.image} />}
          title={video.title}
          description=""
        />
        <span>{video.writer.name}</span>
        <span style={{ marginLeft: "3rem" }}>{video.views} views</span> - <span>{moment(video.createAt).format("MMM Co YY")}</span>
      </Col>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>Recommended</Title>
      <hr />
      <Row gutter={[32, 16]}>{renderCards}</Row>
    </div>
  );
}

export default SubscriptionPage;
