import React from "react";
import Loader from "react-loader-spinner";

const Loading = ({ type, color }) => (
  <div className="loading__global">
    <Loader type={type} color={color} height={120} width={120} />
  </div>
);

export default Loading;
