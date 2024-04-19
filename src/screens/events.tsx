import { Component } from "react";
import cs from "../styles/events.module.css";
import AboutContainer from "../components/about";
import ScreenHeader, { ScreenFooter } from "../components/foot&head";
import { SingleEvent } from "../components/SingleEvent";

export default class EventsScreen extends Component<any> {
  render() {
    return (
      <div className={cs.screenBody}>
        <div className={cs.banner}>
          <div className={cs.bannerTitle}>Our Latest Events</div>
          <div className={cs.bannerDesc}>
            An Extravaganza of Style! 🌟 Join us for a series of exclusive
            fashion events that promise to redefine the way you experience
            glamour and trends.
          </div>
        </div>
        <div className={cs.events}>
          <div className={cs.eventsArea}>
            {this.props.events.loading && "Loading..."}
            {this.props.events.data.map((it: any, k: any) => (
              <SingleEvent it={it} key={k} />
            ))}
          </div>
        </div>
        <AboutContainer />
        <ScreenFooter />
        <ScreenHeader setPage={this.props.setPage} />
      </div>
    );
  }
}
