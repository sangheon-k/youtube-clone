import React, { useEffect, useState } from "react";
import { Card, Icon, Avatar, Typography, Row, Col } from "antd";
import Axios from "axios";
import moment from "moment";
const { Title } = Typography;
const { Meta } = Card;

function SubscriptionPage() {
  const [Video, setVideo] = useState([]);

  useEffect(() => {
    let subscriptionVariables = {
      userFrom: localStorage.getItem("userId"),
    };

    Axios.post("/api/video/getSubscriptionVideos", subscriptionVariables).then(
      (response) => {
        if (response.data.success) {
          console.log(response.data);
          setVideo(response.data.videos);
        } else {
          alert("구독중인 비디오 가져오는 것을 실패 했습니다.");
        }
      }
    );
  }, []);

  const renderCards = Video.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return (
      <Col lg={8} md={8} xs={24} key={index}>
        <a href={`/video/${video._id}`}>
          <div style={{ position: "relative" }}>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.thumbnail}`}
              alt="thumbnail"
            />
            <div className="duration">
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </div>
        </a>
        <br />
        <Meta
          avatar={<Avatar src={"video.writer.image"} />}
          title={video.title}
          description=""
        />
        <span>{video.writer.name}</span>
        <br />
        <span style={{ marginLeft: "3rem" }}> {video.views} views </span> -{" "}
        <span>{moment(video.createdAt).format("MMM Do YY")}</span>
      </Col>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>Subscription</Title>
      <hr />
      <Row gutter={[32, 16]}>{renderCards}</Row>
    </div>
  );
}

export default SubscriptionPage;
