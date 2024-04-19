import { Component, StrictMode } from "react";
import HomeScreen from "./screens/home";
import AcademyScreen from "./screens/academy";
import AgencyScreen from "./screens/agency";
import EventsScreen from "./screens/events";
import EventScreen from "./screens/event";

import axios from "axios";
import ModelScreen from "./screens/model";

export default class App extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      page: "",
      events: { loading: true, data: [] },
      modelId: 0
    };
  }

  _setPage = (v: string) => {
    window.history.replaceState(null, v, v);
    this.setState({ page: v });
  };

  async componentDidMount() {
    const { loading }: any = this.state;
    const path = window.location.pathname;
    if (path === "/academy") this.setState({ page: "academy" });
    if (path === "/agency") this.setState({ page: "agency" });
    if (path === "/events") this.setState({ page: "events" });
    if (path === "/event") this.setState({ page: "event" });
    if (path === "/model" || path === "/model/") this.setState({ page: "model" });
    if (path.startsWith("/model/")) {
      const id = path.substring("/model/".length);
      this.setState({ page: "modelOne", modelId: id });
    }
    console.log(path)

    if (!loading) {
      this.setState({ loading: true });
      await axios
        .get("https://api.avidhilda.com/api/event/getevent")
        .then((res) => {
          console.log(res.data.data);
          this.setState({ events: { loading: false, data: res.data.data } });
        })
        .catch(() => {});
    }
  }

  render() {
    const { page, events, modelId }: any = this.state;
    // event, events, academy, agency
    return (
    <>
      <StrictMode>
        {(page === "events"  ||
          page === "agency"  ||
          page === "academy" ||
          page === "/" ||
          page === "") && (
          <StrictMode>
            <HomeScreen setPage={this._setPage} events={events} />
            {page === "events" && (
              <EventsScreen setPage={this._setPage} events={events} />
            )}
            {page === "agency" && (
              <AgencyScreen setPage={this._setPage} events={events} />
            )}
            {page === "academy" && (
              <AcademyScreen setPage={this._setPage} events={events} />
            )}
          </StrictMode>
        )}
        {page === "event" && (
          <EventScreen setPage={this._setPage} events={events} />
        )}
        {page === "modelOne" && (
          <ModelScreen setPage={this._setPage} events={events} modelId={modelId} />
        )}
      </StrictMode>
      </>
    );
  }
}
