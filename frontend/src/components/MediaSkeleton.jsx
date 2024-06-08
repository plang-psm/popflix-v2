import React from 'react';

const MediaSkeleton = () => {
  return (
    <>
      <div className="container w-100 max-w-[1000px] mx-auto pt-24 px-2 md:text-xl">
        <div className="top-container relative px-4">
          <div className="media-heading w-full flex flex-col justify-center content-center md:flex-row">
            <div className="media-image mx-auto w-full h-[400px] bg-gray-300 animate-pulse"></div>

            <div className="media-description my-2 md:my-auto w-full h-[400px] bg-gray-300 animate-pulse"></div>
          </div>
          <div className="w-full h-full md:flex md:justify-between items-center">
            <div className="my-4 bg-gray-300 animate-pulse h-[316px] w-full md:max-w-[600px]"></div>

            <div className="side-info-container flex flex-row justify-evenly items-center md:flex-col md:justify-center h-[316px] md:min-w-[250px] md:max-w-[300px] my-8 font-thin w-full bg-gray-300 animate-pulse">
              <div className="user-rating max-w-[140px] mx-auto flex justify-around items-center py-4 bg-gray-300 animate-pulse rounded-full"></div>

              <div className="status-budget-revenue mx-auto pb-4 text-start">
                <p className="md:my-4 bg-gray-300 animate-pulse"></p>
                <p className="md:my-4 bg-gray-300 animate-pulse"></p>
                <p className="md:my-4 bg-gray-300 animate-pulse"></p>
              </div>
            </div>
          </div>

          {/* Media mid */}
          <div className="mid-container my-2 w-full ">
            <div className="bg-gray-300 animate-pulse mb-2 md:w-[161px] h-8"></div>

            <div className="credits-container w-full flex justify-between">
              {/* Media cast */}

              <div
                className="bg-gray-300 animate-pulse w-[161px]
                h-[250px]"
              ></div>

              <div
                className="bg-gray-300 animate-pulse w-[161px]
                h-[250px]"
              ></div>
              <div
                className="bg-gray-300 animate-pulse w-[161px]
                h-[250px]"
              ></div>
              <div
                className="bg-gray-300 animate-pulse w-[161px]
                h-[250px]"
              ></div>
              <div
                className="bg-gray-300 animate-pulse w-[161px]
                h-[250px]"
              ></div>
            </div>
          </div>

          {/* Media suggest */}
          <div className="bottom-container my-8 border-t-[.001px] py-8 border-gray-100">
            <div className="bg-gray-300 animate-pulse mb-2 md:w-[230px] h-8"></div>

            <div className="suggestion-container w-full flex justify-between">
              <div className="bg-gray-300 animate-pulse w-[230px] h-[200px]"></div>
              <div className="bg-gray-300 animate-pulse w-[230px] h-[200px]"></div>
              <div className="bg-gray-300 animate-pulse w-[230px] h-[200px]"></div>
              <div className="bg-gray-300 animate-pulse w-[230px] h-[200px]"></div>
            </div>

            <h3 className="bg-gray-300 animate-pulse"></h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaSkeleton;
