import parseDate from "./parseDate";

const formatTime = (time) => {
  return new Intl.DateTimeFormat([], {
    timeStyle: "short",
    timeZone: "America/Chicago",
  }).format(time);
};

const RouteSegment = ({ segment }) => {
  return (
    <div
      style={{
        backgroundColor: segment.segment_color,
        color: segment.segment_text_color,
        padding: "2px 6px",
        space: "200px",
        maxWidth: "450px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          verticalAlign: "middle",
        }}
      >
        <h3 style={{
          fontWeight: 500,
          textDecoration: "underline dotted",
        }}>{segment.segment_name}</h3>
        <p>{segment.segment_line_en}</p>
      </div>
      <div>
        <p
          style={{
            fontStyle: "italic",
            fontWeight: "500",
            marginTop: "-4px",
          }}
        >
          {segment.start_station_name} - {segment.end_station_name}
        </p>
        <p>
          Start:{" "}
          {segment.act_dep !== "0:00:00" ? (
            <>
              {formatTime(
                parseDate(segment.date, segment.act_dep, segment.tz_offset)
              )}{" "}
              (
              {formatTime(
                parseDate(segment.date, segment.sch_dep, segment.tz_offset)
              )}{" "}
              scheduled)
            </>
          ) : (
            <>
              {formatTime(
                parseDate(segment.date, segment.sch_dep, segment.tz_offset)
              )}{" "}
              scheduled
            </>
          )}
        </p>
        <p>
          End:{" "}
          {segment.act_arr !== "0:00:00" ? (
            <>
              {formatTime(
                parseDate(segment.date, segment.act_arr, segment.tz_offset)
              )}{" "}
              (
              {formatTime(
                parseDate(segment.date, segment.sch_arr, segment.tz_offset)
              )}{" "}
              scheduled)
            </>
          ) : (
            <>
              {formatTime(
                parseDate(segment.date, segment.sch_arr, segment.tz_offset)
              )}{" "}
              scheduled
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default RouteSegment;
