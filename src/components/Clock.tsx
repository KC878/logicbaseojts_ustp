
import React, { useState, useEffect } from "react";
import { Typography, Space } from "antd";

const { Text } = Typography;

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format time (12-hour format with AM/PM)
  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Format date (Example: Wed - March 4, 2025)
  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Space direction="horizontal" size="middle">
      <Text style={{ fontSize: "24px", fontWeight: "bold" }}>
        | | 
        {formattedTime}
      </Text>
      <Text style={{ fontSize: "18px" }}>
        {formattedDate}
      </Text>
    </Space>
  );
};

export default Clock;
