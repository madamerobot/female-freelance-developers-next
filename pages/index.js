import { useState, useEffect } from "react";
import { router } from "next/router";

/* components */
import Head from "../components/head";
import Entry from "../components/entry";

export default function Home(props) {
  const { entries } = props;

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const params = router.query.search;
    if (params) {
      setSearchTerm(params);
    }
    setResults(entries);
  }, []);

  useEffect(() => {
    const results = entries.filter((entry) =>
      entry.searchInfo.includes(searchTerm.toLowerCase())
    );
    setResults(results);
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      router.push(`/?search=${searchTerm}`, undefined, { shallow: true });
    }
  }, [searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
          <div className="main-col--header">
            <div>
              <h1 className="h1-headline">
                Female
                <br />
                Freelance
                <br />
                Developers
              </h1>
            </div>
            <div>
              <svg viewBox="0 0 776 556" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fillRule="evenodd">
                  <text
                    transform="rotate(6 352.545 334.644)"
                    fontFamily="Riposte-Light, Riposte"
                    fontSize="65.592"
                    fontWeight="300"
                    letterSpacing="-.031"
                    fill="#000"
                  >
                    <tspan x="263.329" y="203.238">
                      OMG YASS
                    </tspan>{" "}
                    <tspan x="318.019" y="268.038">
                      THERE{" "}
                    </tspan>{" "}
                    <tspan x="281.43" y="332.838">
                      IS A LIST!
                    </tspan>
                  </text>
                  <path
                    stroke="#0000FF"
                    strokeWidth="5.76"
                    d="M537.04 129.4L433.36 7l-51.84 95.04-146.88-74.88L254.8 129.4 10 117.88l171.36 122.4L63 296h171.64l20.16 163 99.36-97.76 146.88 188.64 57.6-195.84 210.24 82.08-123.84-195.84L768.88 7z"
                  />
                </g>
              </svg>
            </div>
          </div>
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

Home.getInitialProps = async (ctx) => {
  const res = await fetch(`${process.env.SHEETY_URL}`);
  const json = await res.json();
  const entries = json.list.map((entry) => {
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
