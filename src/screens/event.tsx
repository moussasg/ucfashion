import { Component, StrictMode } from "react";
import cs from "../styles/event.module.css";
import ScreenHeader, { ScreenFooter } from "../components/foot&head";
import AboutContainer from "../components/about";
import axios from "axios";
import EventsList from "../components/SingleEvent";

export default class EventScreen extends Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      event: {},
    };
  }
  async componentDidMount() {
    const params: any = new URL(window.location.href).searchParams;
    var id = "0";
    params.forEach((value: any, key: any) => {
      if (key === "id") id = value;
    });
    await axios
      .get("https://api.avidhilda.com/api/event/getevent/" + id)
      .then((res) => this.setState({ event: res.data.data }))
      .catch(() => {});
    this.setState({ loading: false });
  }

  render() {
    const { event, loading }: any = this.state;
    return (
      <StrictMode>
        {loading ? (
          <div
            style={{
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Loading...
          </div>
        ) : (
          <div className={cs.detailsRow}>
            <div className={cs.detailsArea}>
              <div className={cs.csA1}>{event?.category}</div>
              <div className={cs.title}>{event?.title}</div>
              <div className={cs.desc}>{event?.description}</div>
              <div className={cs.dateArea}>{event?.edate}</div>
              <div className={cs.locationArea}>
                {event?.location}&nbsp;
                <a
                  style={{ color: "blue", textDecoration: "underline" }}
                  href={event?.gmaps}
                >
                  View in map
                </a>
              </div>
              {/* <div className={cs.locationArea}>10:24 PM</div> */}
            </div>
            <img className={cs.imgArea} src={event?.image} />
          </div>
        )}
        <EventsList events={this.props.events} />
        {!loading && <AboutContainer />}
        <ScreenHeader setPage={this.props.setPage} />
        <ScreenFooter />
      </StrictMode>
    );
  }
}
