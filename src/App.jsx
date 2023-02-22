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
  const [tracking, setTracking] = useState({});
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
      fetch("https://cta-speedrun-api-production.up.railway.app/trip")
        .then((response) => response.json())
        .then((data) => {
          setSections(data);
          console.log("updated trip data");
          setLastUpdated(new Date().valueOf());
        });

      fetch("https://cta-speedrun-api-production.up.railway.app/live")
        .then((response) => response.json())
        .then((data) => {
          setTracking(data);
          console.log("updated vehicle data");
          setLastUpdated(new Date().valueOf());
        });

      setTimeout(updateData, 30000);
    };

    //api no longer exists
    updateData();
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
        The tracking should be *a lot* more accurate than my last run especially
        since I've actually tested my code properly this time. The layout is
        about the same, as I felt that it was probably the best I was gonna get.
        If you would like to recommend any changes, feel free to reach out to me
        on Twitter.
      </p>

      <p>
        Are you a devloper? You can mess around with the api{" "}
        <a href='https://cta-speedrun-api-production.up.railway.app/'>here</a>.
        The <i>/live</i> endpoint relays live vehicle tracking and <i>/trip</i>{" "}
        relays the information on the various segments being taken.
      </p>

      <p>
        Below is a list of any previous runs I've done. I'll be updating this
        every time I do a run, as I expect myself to do quite a few over time.
      </p>

      <h2>Previous Runs</h2>
      <ul>
        <li>
          <a href='/prev/2023-02-02/index.html'>Feb 02, 2023</a>
        </li>
      </ul>

      <h2>Total Time</h2>
      {sections.length === 0 ? null : (
        <p
          style={{
            fontSize: "2rem",
          }}
        >
          {sections[sections.length - 1].act_arr === 0 ? (
            <>{timeSince(sections[0].act_dep, new Date().valueOf())}</>
          ) : (
            <>
              {timeSince(
                sections[0].act_dep,
                sections[sections.length - 1].act_arr
              )}
            </>
          )}
        </p>
      )}
      <h2>Data Last Updated</h2>
      <p>
        {lastUpdated === 0
          ? "Data currently unavailable :("
          : Math.floor((new Date().valueOf() - lastUpdated) / 1000) + " seconds ago"}
      </p>
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
                    Ideal Timings (Based on schedule, unrealistic with the
                    current state of the CTA):
                    <ul>
                      <li>
                        Departure:{" "}
                        {new Intl.DateTimeFormat([], {
                          timeZone: "America/Chicago",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                        }).format(new Date(section.sch_dep))}
                      </li>
                      <li>
                        Arrival:{" "}
                        {new Intl.DateTimeFormat([], {
                          timeZone: "America/Chicago",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                        }).format(new Date(section.sch_arr))}
                      </li>
                    </ul>
                  </li>
                  <li>
                    Actual Timings:
                    <ul>
                      <li>
                        Departure:{" "}
                        {section.act_dep === 0
                          ? "N/A"
                          : new Intl.DateTimeFormat([], {
                              timeZone: "America/Chicago",
                              hour: "numeric",
                              minute: "numeric",
                              second: "numeric",
                            }).format(new Date(section.act_dep))}
                      </li>
                      <li>
                        Arrival:{" "}
                        {section.act_arr === 0
                          ? "N/A"
                          : new Intl.DateTimeFormat([], {
                              timeZone: "America/Chicago",
                              hour: "numeric",
                              minute: "numeric",
                              second: "numeric",
                            }).format(new Date(section.act_arr))}
                      </li>
                    </ul>
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
