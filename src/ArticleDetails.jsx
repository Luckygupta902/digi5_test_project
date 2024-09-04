import React from 'react';

const ArticleDetails = ({ article }) => {
  if (!article) return <p>Select an article to see details</p>;

  return (
    <div className="p-4 border-t mt-4">
      <h2 className="text-xl font-bold mb-2">{article.title}</h2>
      <p className="text-gray-700 mb-2"><strong>Author:</strong> {article.author}</p>
      <p className="text-gray-700 mb-2"><strong>Summary:</strong> {article.summary}</p>
      <p className="text-gray-500"><strong>Published:</strong> {article.published_date}</p>
    </div>
  );
};

export default ArticleDetails;
