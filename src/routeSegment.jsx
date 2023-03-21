const RouteSegment = ({ segment }) => { 
  return (
    <div
      style={{
        backgroundColor: segment.segment_color,
        color: segment.segment_text_color,
        padding: "2px 6px",
        space: "200px",
        maxWidth: "350px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          verticalAlign: "middle",
        }}
      >
        <h3>{segment.segment_name}</h3>
        <p>{segment.segment_line_en}</p>
      </div>
      <div>
        <p
          style={{
            textDecoration: "underline dotted",
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
              {segment.act_dep} ({segment.sch_dep} scheduled)
            </>
          ) : (
            <>
              {segment.sch_dep} scheduled
            </>
          )}
        </p>
        <p>
          End:{" "}
          {segment.act_arr !== "0:00:00" ? (
            <>
              {segment.act_arr} ({segment.sch_arr} scheduled)
            </>
          ) : (
            <>
              {segment.sch_arr} scheduled
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default RouteSegment;
