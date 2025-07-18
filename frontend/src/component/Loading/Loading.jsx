import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div className="text-center py-5">
      <Spinner animation="border" variant="primary" />
      <p className="mt-2">Please wait, loading...</p>
    </div>
  );
};

export default Loading;