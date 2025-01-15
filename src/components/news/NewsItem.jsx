import React from 'react';
const NewsItem = ({ title, description, imageUrl, newsUrl, author, date, source }) => {
  return (

    <div className="max-w-xs rounded overflow-hidden bg-black shadow-lg h-full flex flex-col">

      <div className="h-28 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-cVT-QGYraD2nsjDQEs6eBiYhXszpkMCyjQ&s"}
          onError={(e) => {
            e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-cVT-QGYraD2nsjDQEs6eBiYhXszpkMCyjQ&s";
          }}
          alt={title}
        />
      </div>


      <div className="px-4 py-2 flex-grow">
        <div className="font-bold text-sm mb-1 text-white line-clamp-2">{title}</div>
        <p className="text-gray-400 text-xs line-clamp-2">
          {description}
        </p>
      </div>


      <div className="px-4 pt-2 pb-4 mt-auto">
        <span className="block bg-gray-800 px-2 py-1 text-xs font-semibold text-gray-400 rounded">
          By {author ? author : "Unknown"} on {new Date(date).toGMTString()}
        </span>
        <a
          href={newsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex w-full h-10 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
