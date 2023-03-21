import { useState, useEffect } from "react";
import { parse } from "csv-parse/browser/esm/sync";
import "./App.css";
import RouteSegment from "./routeSegment";

const endpoint =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT6WGmf9kubHJfoVWYPQPC-OdnMhK1xUSldie0ZPeMOpdFI2NsL_3DeJeMwoJcXyzRDshTTgn5z67Vz/pub?gid=986120183&single=true&output=csv";

const titleCase = (str) => {
  str = str.toLowerCase().split(" ");
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
};

const timeSince = (a, b) => {
  const aNum = new Date(a).valueOf();
  const bNum = new Date(b).valueOf();

  var delta = Math.abs(bNum - aNum) / 1000;

  // calculate (and subtract) whole days
  var days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  var hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  var minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  var seconds = delta % 60; // in theory the modulus is not required

  let prefix = "";

  if (aNum > bNum) {
    prefix = "";
  }

  return `${prefix}${hours}h ${minutes}m ${Math.floor(seconds)}s`;
};

function App() {
  const [sections, setSections] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(0);

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 250);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateData = () => {
      fetch(endpoint)
        .then((response) => response.text())
        .then((data) => {
          const parsed = parse(data, {
            columns: true,
            skip_empty_lines: true,
          });

          setSections(parsed);

          setLastUpdated(new Date().valueOf());
        });

      setTimeout(updateData, 60000);
    };

    //api no longer exists
    updateData();
  }, []);

  return (
    <main>
      <h1>Piero's CTA Speedrun</h1>
      <p>
        Hi, my name is Piero, and this is a little tool that can be used to
        track my attempts. You can also follow along{" "}
        <a href='https://twitter.com/piemadd'>on my Twitter</a>.
      </p>

      <p>
        Have questions about speedrunning the CTA? You can{" "}
        <a href='https://discord.gg/wPrCYXJP9p'>join the discord</a> or{" "}
        <a href='mailto:piero@piemadd.com'>email me</a>.
      </p>

      <h2>Previous Runs</h2>
      <ul>
        <li>
          <a href='/prev/2023-02-02/index.html'>Feb 02, 2023</a>
        </li>
        <li>
          <a href='/prev/2023-02-23/index.html'>Feb 23, 2023</a>
        </li>
      </ul>

      <h2>Current Run</h2>
      {sections.length > 0 ? (
        <>
          {sections.map((section) => (
            <RouteSegment segment={section} key={section.segment_id}/>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}

      <br />
      <p>This site uses google analytics for analytical purposes.</p>
    </main>
  );
}

export default App;
