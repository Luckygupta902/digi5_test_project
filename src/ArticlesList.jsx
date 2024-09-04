import React, { useState, useEffect } from 'react';

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/articles', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setArticles(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const onSelectArticle = (article) => {
    setSelectedArticle(article);
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-center text-lg font-medium text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-lg font-medium text-red-500">{error}</p>;
  if (articles.length === 0) return <p className="text-center text-lg font-medium text-gray-600">No articles found.</p>;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Articles</h2>
      <input
        type="text"
        placeholder="Search articles..."
        className="mb-6 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="space-y-4">
        {filteredArticles.map((article) => (
          <li
            key={article.id}
            className="border-b border-gray-300 pb-4 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
            onClick={() => onSelectArticle(article)}
          >
            <h3 className="text-xl font-semibold text-gray-800">{article.title}</h3>
            <p className="text-sm text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>

      {selectedArticle && (
        <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">{selectedArticle.title}</h2>
          <p className="text-sm text-gray-500 mb-4">{new Date(selectedArticle.publishedAt).toLocaleDateString()}</p>
          <p className="text-gray-700 mb-6">{selectedArticle.summary}</p>
          <p className="text-gray-600"><strong>Author:</strong> {selectedArticle.author}</p>
        </div>
      )}
    </div>
  );
};

export default ArticlesList;
