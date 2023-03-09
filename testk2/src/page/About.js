import React, { useState, useEffect } from "react";
import Header from "../Component/Header";

function About() {
  const [showQuotes, setShowQuotes] = useState("");
  const [authorQuotes, setAuthorQuotes] = useState([]);
  const [indexRandom, setIndexRandom] = useState([]);
  const [random, setRandom] = useState(0);
  const [showAuthorQuotes, setShowAuthorQuotes] = useState(false);

  useEffect(() => {
    fetch("https://api.quotable.io/quotes")
      .then((res) => res.json())
      .then((data) => {
        setShowQuotes(data.results[0]);
        setIndexRandom(data.results);
      });
  }, []);

  const handleRandom = () => {
    setShowAuthorQuotes(false);
    const randomIndex = Math.floor(Math.random() * indexRandom.length);
    setShowQuotes(indexRandom[randomIndex]);
  };

  const handleAuthorQuotes = (author) => {
    setShowAuthorQuotes(true);
    const quotesByAuthor = indexRandom.filter(
      (quote) => quote.author === author
    );
    setAuthorQuotes(quotesByAuthor);
  };

  return (
    <div>
      <Header onSubmit={handleRandom} />
      <h1>{showQuotes.content}</h1>

      <ul>
        <li onClick={() => handleAuthorQuotes(showQuotes.author)}>
          {showQuotes.author}
        </li>
      </ul>

      {showAuthorQuotes && (
        <div>
          <h2>{showQuotes.author}</h2>
          <ul>
            {authorQuotes.map((quote) => (
              <li key={quote._id}>
                <h5>{quote.content}</h5>
                <h6>{quote.tags}</h6>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default About;
