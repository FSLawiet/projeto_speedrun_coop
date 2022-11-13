import { useState, useEffect } from "react";
import { Quotes } from "../@types/Quotes";

import "./QuoteHeader.css";

export interface QuoteHeaderParams {
  quotesList: Quotes[];
}

export const QuoteHeader = ({ quotesList }: QuoteHeaderParams) => {
  const [quotes, setQuotes] = useState<Quotes[]>(quotesList);

  return (
    quotes && (
      <div id="ticker-wrap">
        <div id="ticker">
          {quotes.map((quote, key) => (
            <div className="ticker-item" key={key}>
              <p id="text">
                ☭☭☭ {quote.quote} - <cite id="author">{quote.author}</cite> ☭☭☭
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  );
};
