import { useState, useEffect } from "react";
import "./App.css";

const titleCase = (str) => {
  str = str.toLowerCase().split(" ");
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
};

function App() {
  const [sections, setSections] = useState([]);
  const [tracking, setTracking] = useState({});

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
        This site was made in less than 2 hours, so please be patient with me if
        something goes wrong. The site will be rehosted with static data at the
        end of my run for archival purposes.
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
