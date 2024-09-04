import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArticlesList1 = ({ onSelectArticle }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h2>Articles</h2>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <button onClick={() => onSelectArticle(article.id)}>
              {article.title} - {article.publicationDate}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlesList1;
