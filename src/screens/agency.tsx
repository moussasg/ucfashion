import React, { Component } from "react";
import cs from "../styles/agency.module.css";
import ScreenHeader, { ScreenFooter } from "../components/foot&head";
import AboutContainer from "../components/about";
import EventsList from "../components/SingleEvent";

export default class AgencyScreen extends Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={cs.body}>
        <div className={cs.banner}>
          <div className={cs.bannerBody}>
            <div className={cs.bannerTitle}>ACADEMY</div>
            <div className={cs.bannerDesc}>
              MODELING ACADEMIES OFFER A RANGE OF CLASSES AND WORKSHOPS TO TEACH
              ASPIRING MODELS VARIOUS ASPECTS OF THE INDUSTRY, INCLUDING RUNWAY
              WALKING, POSING, PHOTOGRAPHY, MAKEUP APPLICATION, SKINCARE, AND
              FASHION STYLING. THESE CLASSES HELP MODELS REFINE THEIR SKILLS AND
              GAIN CONFIDENCE.
            </div>
          </div>
        </div>
        <AboutContainer />
        <EventsList events={this.props.events} />
        <ScreenFooter />
        <ScreenHeader setPage={this.props.setPage} />
      </div>
    );
  }
}
