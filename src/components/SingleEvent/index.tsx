import cs from "./index.module.css";

export default function EventsList({ events }: any) {
  return (
    <div className={cs.section5}>
      <div className={cs.title}>Our Latest Events</div>
      <div className={cs.desc}>
        An Extravaganza of Style! 🌟 Join us for a series of exclusive fashion
        events that promise to redefine the way you experience glamour and
        trends.
      </div>
      <div className={cs.eventsArea}>
        {events.loading && "Loading..."}
        {events.data.map((it: any, k: any) => (
          <SingleEvent it={it} key={k} />
        ))}
      </div>
      {/* <div className="blackBtn">Explore All Events</div> */}

      {/* <div className={cs.popup} style={!selected ? { display: "none" } : {}}>
        <div className={cs.popupBody}>
        <div className={cs.popDetailsArea}>
        <div className={cs.popHeader}>
        Title
        <div className={cs.xBtn} onClick={() => setselected(false)} />
        </div>
        </div>
        </div>
      </div> */}
    </div>
  );
}

export function SingleEvent({ it }: any) {
  return (
    <div
      className={cs.event}
      onClick={() => (window.location.href = "event?id=" + it?.id)}
    >
      <img className={cs.img} src={it?.image} />
      <div className={cs.detgailsArea}>
        <div className={cs.eventTitle}>
          {it?.title}
          {/* <div className={cs.eventdate}>10-10-2023</div> */}
        </div>
        <div className={cs.eventDesc}>{it?.edate}</div>
      </div>
      <div className={cs.locationArea}>{it?.location}</div>
    </div>
  );
}
