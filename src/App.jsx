import { useState, useEffect } from "react";
import "./App.css";

const titleCase = (str) => {
  str = str.toLowerCase().split(" ");
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
};

const timeSince = (a, b) => {
var delta = Math.abs(b - a) / 1000;

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
var seconds = delta % 60;  // in theory the modulus is not required

return `${hours}h ${minutes}m ${Math.floor(seconds)}s`;
}

function App() {
  const [sections, setSections] = useState([
    {
      segment_name: "Purple",
      segment_id: "purple",
      segment_line: "train_purple",
      start_station_name: "Linden",
      start_station_id: 41050,
      end_station_name: "Howard",
      end_station_id: 40900,
      departure: 1675346732000,
      arrival: 1675347512000,
      vehicle_id: 506,
    },
    {
      segment_name: "Yellow Up",
      segment_id: "yellow_up",
      segment_line: "train_yellow",
      start_station_name: "Howard",
      start_station_id: 40900,
      end_station_name: "Dempster-Skokie",
      end_station_id: 40140,
      departure: 1675347866000,
      arrival: 1675348354000,
      vehicle_id: 593,
    },
    {
      segment_name: "Yellow Back",
      segment_id: "yellow_back",
      segment_line: "train_yellow",
      start_station_name: "Dempster-Skokie",
      start_station_id: 40140,
      end_station_name: "Howard",
      end_station_id: 40900,
      departure: 1675348715000,
      arrival: 1675349284000,
      vehicle_id: 593,
    },
    {
      segment_name: "Red Down",
      segment_id: "red_down",
      segment_line: "train_red",
      start_station_name: "Howard",
      start_station_id: 40900,
      end_station_name: "95th/Dan Ryan",
      end_station_id: 40450,
      departure: 1675349540000,
      arrival: 1675353607000,
      vehicle_id: 814,
    },
    {
      segment_name: "Red Backtrack",
      segment_id: "red_back",
      segment_line: "train_red",
      start_station_name: "95th/Dan Ryan",
      start_station_id: 40450,
      end_station_name: "63rd",
      end_station_id: 40910,
      departure: 1675354206000,
      arrival: 1675354832000,
      vehicle_id: 814,
    },
    {
      segment_name: "Red to Green",
      segment_id: "red_to_green",
      segment_line: "bus_63",
      start_station_name: "63rd Red Line Station",
      start_station_id: 3229,
      end_station_name: "Ashland/63rd Green Line Station",
      end_station_id: 3245,
      departure: 1675355090000,
      arrival: 1675355631000,
      vehicle_id: 8214,
    },
    {
      segment_name: "Short Green",
      segment_id: "short_geen",
      segment_line: "train_green",
      start_station_name: "Ashland/63rd",
      start_station_id: 40290,
      end_station_name: "Halsted (Green)",
      end_station_id: 40940,
      departure: 1675355761000,
      arrival: 1675355908000,
      vehicle_id: 608,
    },
    {
      segment_name: "Green to Green",
      segment_id: "green_to_green",
      segment_line: "bus_63",
      start_station_name: "63rd Street & Halsted (Green Line)",
      start_station_id: 15879,
      end_station_name: "63rd Street & Cottage Grove (Green Line)",
      end_station_id: 3442,
      departure: 1675356440000,
      arrival: 1675357065000,
      vehicle_id: 1527,
    },
    {
      segment_name: "Green to Orange",
      segment_id: "green_to_orange",
      segment_line: "train_green",
      start_station_name: "Cottage Grove",
      start_station_id: 40720,
      end_station_name: "Roosevelt",
      end_station_id: 41400,
      departure: 1675358098000,
      arrival: 1675359410000,
      vehicle_id: 609,
    },
    {
      segment_name: "Orange",
      segment_id: "orange",
      segment_line: "train_orange",
      start_station_name: "Roosevelt",
      start_station_id: 41400,
      end_station_name: "Midway",
      end_station_id: 40930,
      departure: 1675360160000,
      arrival: 1675361525000,
      vehicle_id: 702,
    },
    {
      segment_name: "Orange to Pink",
      segment_id: "orange_to_pink",
      segment_line: "bus_54B",
      start_station_name: "Midway Orange Line Station",
      start_station_id: 15761,
      end_station_name: "Cermak & Cicero",
      end_station_id: 14879,
      departure: 1675361876000,
      arrival: 1675363372000,
      vehicle_id: 8110,
    },
    {
      segment_name: "Short Pink",
      segment_id: "short_pink",
      segment_line: "walking_Cermak",
      start_station_name: "Cicero (Pink)",
      start_station_id: 40420,
      end_station_name: "54th/Cermak",
      end_station_id: 40580,
      departure: 1675363372000,
      arrival: 1675363863000,
      vehicle_id: 0,
    },
    {
      segment_name: "Pink",
      segment_id: "pink",
      segment_line: "train_pink",
      start_station_name: "54th/Cermak",
      start_station_id: 40580,
      end_station_name: "Clinton (Green/Pink)",
      end_station_id: 41160,
      departure: 1675364012000,
      arrival: 1675365507000,
      vehicle_id: 307,
    },
    {
      segment_name: "Green West",
      segment_id: "green_west",
      segment_line: "train_green",
      start_station_name: "Clinton (Green/Pink)",
      start_station_id: 41160,
      end_station_name: "Harlem/Lake",
      end_station_id: 40020,
      departure: 1675365917000,
      arrival: 1675367368000,
      vehicle_id: 607,
    },
    {
      segment_name: "Green to Blue",
      segment_id: "green_to_blue",
      segment_line: "pace_318",
      start_station_name: "Harlem/Lake CTA",
      start_station_id: 8739,
      end_station_name: "Forest Park CTA",
      end_station_id: 6269,
      departure: 1675367880000,
      arrival: 1675368270000,
      vehicle_id: 20452,
    },
    {
      segment_name: "Blue",
      segment_id: "blue",
      segment_line: "train_blue",
      start_station_name: "Forest Park",
      start_station_id: 40390,
      end_station_name: "O'Hare",
      end_station_id: 40890,
      departure: 1675368955000,
      arrival: 1675373881000,
      vehicle_id: 213,
    },
    {
      segment_name: "Blue Backtrack",
      segment_id: "blue_backtrack",
      segment_line: "train_blue",
      start_station_name: "O'Hare",
      start_station_id: 40890,
      end_station_name: "Montrose (Blue)",
      end_station_id: 41330,
      departure: 1675374331000,
      arrival: 1675375368000,
      vehicle_id: 120,
    },
    {
      segment_name: "Blue to Brown",
      segment_id: "blue_to_brown",
      segment_line: "bus_78",
      start_station_name: "Montrose Blue Line Station",
      start_station_id: 11326,
      end_station_name: "Montrose & Kimball",
      end_station_id: 11338,
      departure: 1675375838000,
      arrival: 1675376511000,
      vehicle_id: 8346,
    },
    {
      segment_name: "Brown",
      segment_id: "brown",
      segment_line: "train_brown",
      start_station_name: "Kimball",
      start_station_id: 41290,
      end_station_name: "Clark/Lake",
      end_station_id: 40380,
      departure: 1675377116000,
      arrival: 1675380091000,
      vehicle_id: 423,
    },
  ]);
  const [tracking, setTracking] = useState({
    purple: {
      vehicle_id: 506,
      segment_line: "purple",
      arrival: "2023-02-02T14:16:24.000Z",
      end_station_id: 40900,
      end_station_name: "Howard",
    },
    yellow_up: {
      vehicle_id: 593,
      segment_line: "yellow",
      arrival: "2023-02-02T14:33:46.000Z",
      end_station_id: 40140,
      end_station_name: "Dempster-Skokie",
    },
    yellow_back: {
      vehicle_id: 593,
      segment_line: "yellow",
      arrival: "2023-02-02T14:47:38.000Z",
      end_station_id: 40900,
      end_station_name: "Howard",
    },
    red_down: {
      vehicle_id: 814,
      segment_line: "red",
      arrival: "2023-02-02T15:56:41.000Z",
      end_station_id: 40450,
      end_station_name: "95th/Dan Ryan",
    },
    red_back: {
      vehicle_id: 814,
      segment_line: "red",
      arrival: "2023-02-02T16:20:08.000Z",
      end_station_id: 40910,
      end_station_name: "63rd",
    },
    green_to_orange: {
      vehicle_id: 609,
      segment_line: "green",
      arrival: "2023-02-02T17:37:10.000Z",
      end_station_id: 41400,
      end_station_name: "Roosevelt",
    },
    orange: {
      vehicle_id: 702,
      segment_line: "orange",
      arrival: "2023-02-02T18:10:57.000Z",
      end_station_id: 40930,
      end_station_name: "Midway",
    },
    pink: {
      vehicle_id: 307,
      segment_line: "pink",
      arrival: "2023-02-02T19:33:12.000Z",
      end_station_id: 41160,
      end_station_name: "Clinton (Green/Pink)",
    },
    green_west: {
      vehicle_id: 607,
      segment_line: "green",
      arrival: "2023-02-02T19:47:52.000Z",
      end_station_id: 40020,
      end_station_name: "Harlem/Lake",
    },
    blue: {
      vehicle_id: 213,
      segment_line: "blue",
      arrival: "2023-02-02T21:36:36.000Z",
      end_station_id: 40890,
      end_station_name: "O'Hare",
    },
    blue_backtrack: {
      vehicle_id: 120,
      segment_line: "blue",
      arrival: "2023-02-02T22:02:37.000Z",
      end_station_id: 41330,
      end_station_name: "Montrose (Blue)",
    },
    brown: {
      vehicle_id: 423,
      segment_line: "brown",
      arrival: "2023-02-02T23:21:03.000Z",
      end_station_id: 40380,
      end_station_name: "Clark/Lake",
    },
  });

  useEffect(() => {
    const updateData = () => {
      fetch("https://cta-speedrun-api-production.up.railway.app/trip")
        .then((response) => response.json())
        .then((data) => {
          setSections(data);
        });

      fetch("https://cta-speedrun-api-production.up.railway.app/live")
        .then((response) => response.json())
        .then((data) => {
          setTracking(data);
        });

      setTimeout(updateData, 60000);
    };

    //api no longer exists
    //updateData();
  }, []);

  return (
    <main>
      <h1>Piero's CTA Speedrun Tracker</h1>
      <p>
        Hi, my name is Piero, and this is a little tool that can be used to
        track my CTA speedrun. If something seems broken, you can always follow
        along <a href='https://twitter.com/piemadd'>on my Twitter</a>.
      </p>
      <p>
        This site was made in less than 2 hours, so please be patient with me if
        something goes wrong. The site will be rehosted with static data at the
        end of my run for archival purposes.
      </p>
<h2>Total Time</h2>
{sections.length === 0 ? (null) : (<p>
{sections[sections.length - 1].arrival === 0 ? (
<>
{timeSince(sections[0].departure, new Date().valueOf())}
</>) : (<>
{timeSince(sections[0].departure, sections[sections.length - 1].arrival)}
</>)}
</p>)}
      <h2>List of Sections</h2>
      <p>
        Below is a list of the various routes I am taking. Live tracking data
        will be available for the entire route, minus my transfer from the green
        line to the blue line, which uses a Pace bus. Their tracking is,
        unfortunately, unavailable to the general public.
      </p>
      <section id='sections-list'>
        {sections.length === 0 ? (
          <p>Sections list currently unavailable :(</p>
        ) : (
          <ul>
            {sections.map((section) => (
              <li key={section.segment_id}>
                <h3>{section.segment_name}</h3>
                <ul>
                  <li>Start Station: {section.start_station_name}</li>
                  <li>End Station: {section.end_station_name}</li>
                  <li>
                    Travel Mode: {titleCase(section.segment_line.split("_")[0])}
                  </li>
                  <li>
                    Route Name/Number:{" "}
                    {titleCase(section.segment_line.split("_")[1] ?? "N/A")}
                  </li>
                  <li>
                    Departure Time:{" "}
                    {section.departure === 0
                      ? "N/A"
                      : new Intl.DateTimeFormat([], {
                          timeZone: "America/Chicago",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                        }).format(new Date(section.departure))}
                  </li>
                  <li>
                    Arrival Time:{" "}
                    {section.arrival === 0
                      ? "N/A"
                      : new Intl.DateTimeFormat([], {
                          timeZone: "America/Chicago",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                        }).format(new Date(section.arrival))}
                  </li>
                  <li>
                    Tracking Data:
                    {Object.keys(tracking).some(
                      (item) => item === section.segment_id
                    ) ? (
                      <ul>
                        <li>
                          Vehicle ID/Run Number:{" "}
                          {tracking[section.segment_id].vehicle_id}
                        </li>
                        <li>
                          Estimated Arrival Time:{" "}
                          {new Intl.DateTimeFormat([], {
                            timeZone: "America/Chicago",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          }).format(
                            new Date(tracking[section.segment_id].arrival)
                          )}
                        </li>
                      </ul>
                    ) : (
                      <ul>
                        <li>Tracking data currently unavailable :(</li>
                      </ul>
                    )}
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        )}
      </section>
<p>This site uses google analytics for analytical purposes.</p>
    </main>
  );
}

export default App;
