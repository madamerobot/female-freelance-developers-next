import React from "react";
import { useState, useEffect } from "react";
import { router } from "next/router";

/* components */
import Head from "../components/Head";
import Entry from "../components/Entry";
import Header from "../components/Header";

type EntryInfo = {
  firstName: string;
  lastName: string;
  website: string;
  email: string;
  socialHandle: string;
  socialUrl: string;
  expertise: string;
  tags: string;
  location: string;
  approved: string;
  id: number;
  searchInfo: string;
};

type HomeProps = {
  entries: EntryInfo[];
};

export default function Home(props: HomeProps) {
  const { entries } = props;

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<EntryInfo[]>([]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const params = router.query.search;

    if (params) {
      setSearchTerm(params.toString());
    }
    setResults(entries);
  }, []);

  useEffect(() => {
    const multiSearchAnd = (text, searchWords) =>
      searchWords.every((el) => {
        return text.match(new RegExp(el, "i"));
      });

    const searchArray = [...searchTerm.split(" ")];

    const results = entries.filter((entry) =>
      multiSearchAnd(entry.searchInfo, searchArray)
    );
    setResults(results);
  }, [searchTerm]);

  return (
    <main>
      <Head />
      <div className="layout-wrapper">
        <div className="side-col">
          <div className="side-col--section">
            <h3 id="manifest">The Manifest</h3>
            <p>
              It is hard to find female (identifying) freelance developers! This
              list shall help you to get a more diverse selection of cool people
              to make the best choice for your project.
            </p>
          </div>
          <div className="side-col--section">
            <h3>How to ask</h3>
            <p>
              Here are some helpful questions to answer when you approach a
              developer for a project:
            </p>
            <ul>
              <li>Does the job include only development or also design?</li>
              <li>
                Which technologies have to be used or does the developer have
                free choice?
              </li>
              <li>What is the budget and the timeline? :)</li>
              <li>Do you have reference links to websites you like?</li>
            </ul>
          </div>
          <div className="side-col--section">
            <h3>Get listed</h3>
            <p>
              Alrighty! You can submit your details through{" "}
              <a href="/submit">this form.</a>
            </p>
          </div>
          <div className="side-col--section side-logo">
            <a href="https://cafe-robot.co/">
              <img src="cafe-robot-logo.png" alt="Cafe Robot Logo" />
            </a>
          </div>
        </div>
        <div className="main-col">
          <Header />
          <div className="search-field--wrapper">
            <input
              className="search-field"
              type="text"
              placeholder="Search location or skill"
              value={searchTerm}
              onChange={handleChange}
            />
          </div>
          {results.length ? (
            results.map((entry, index) => <Entry data={entry} key={index} />)
          ) : (
            <p className="search-notification">
              Oh no, unfortunately we couldn't find any results for your query.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

Home.getInitialProps = async () => {
  const res = await fetch(`${process.env.SHEETY_URL}`);
  const json = await res.json();
  const entries = json.list.map((entry: EntryInfo) => {
    return {
      ...entry,
      searchInfo:
        `${entry.location} ${entry.expertise} ${entry.firstName} ${entry.lastName}`.toLowerCase(),
    };
  });
  const shuffledEntries = entries
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .filter((a) => a.approved === "Yes");

  return { entries: shuffledEntries };
};
