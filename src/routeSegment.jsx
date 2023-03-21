const testData = {
  segment_name: "Pink",
  segment_id: "pink",
  segment_line: "train_pink",
  start_station_name: "Polk",
  end_station_name: "54th/Cermak",
  sch_dep: "6:01:00",
  sch_arr: "6:19:00",
  act_dep: "0:00:00",
  act_arr: "0:00:00",
  tracking: "1",
  segment_color: "e27ea6",
  segment_text_color: "ffffff",
};

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
            fontWeight: "bold",
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
