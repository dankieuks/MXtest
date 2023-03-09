import React, { useState, useEffect } from "react";
import Header from "../Component/Header";
import "./Home.css";
import { FiArrowDown } from "react-icons/fi";
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
    <div className="container">
      <Header onSubmit={handleRandom} />
      <h2>{showQuotes.content}</h2>
      <div className="who">
        <h4 onClick={() => handleAuthorQuotes(showQuotes.author)}>
          {showQuotes.author}
        </h4>
        <h4>
          <FiArrowDown />
        </h4>
      </div>

      {showAuthorQuotes && (
        <div>
          <ul>
            {authorQuotes.map((quote) => (
              <li key={quote._id}>
                <h3>{quote.content}</h3>
                <h5>{quote.tags}</h5>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default About;
