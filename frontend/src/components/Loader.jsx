import React from "react";

const Loader = ({ loading }) => {
  return (
    loading && (
      <div className="flex items-center justify-center my-4">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-blue-500 font-medium">Loading...</span>
      </div>
    )
  );
};

export default Loader;
