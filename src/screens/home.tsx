import { Component, StrictMode } from "react";
import cs from "../styles/home.module.css";
import ScreenHeader, { ScreenFooter } from "../components/foot&head";
import AboutContainer from "../components/about";
import EventsList from "../components/SingleEvent";

export default class HomeScreen extends Component<any> {
  constructor(props: any) {
    super(props);
    this.state = { bannerClicked: false };
  }

  render() {
    const { bannerClicked }: any = this.state;
    return (
      <StrictMode>
        <div
          className={cs.home}
          onClick={() => this.setState({ bannerClicked: true })}
        >
          <video className={cs.banner} autoPlay loop muted>
            <source src={require("../assets/banner.mp4")} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className={cs.bannerContentArea}>
            <div className={cs.bannerContentBody}>
              <div className={cs.header}></div>
            </div>
          </div>
          <div className={cs.loaderPage} />
          <div className={cs.moreBtn}>CLICK ON TO VIEW MORE</div>
          <div className={bannerClicked ? cs.page1_ : cs.page1}>
            <div className={cs.secBtnList}>
              <div
                className={cs.secBtn}
                onClick={() => {
                  this.props.setPage("events");
                  setTimeout(
                    () => this.setState({ bannerClicked: false }),
                    1000
                  );
                }}
              >
                <div className={cs.secBtnBody}>
                  <div className={cs.secBtnHeader}>EVENTS</div>
                  <div className={cs.desc}>
                    An Extravaganza of Style! 🌟 Join us for a series of
                    exclusive fashion events that promise to redefine the way
                    you experience glamour and trends.
                  </div>
                </div>
              </div>
              <div
                className={cs.secBtn1}
                onClick={() => {
                  this.props.setPage("agency");
                  setTimeout(
                    () => this.setState({ bannerClicked: false }),
                    1000
                  );
                }}
              >
                <div className={cs.secBtnBody}>
                  <div className={cs.secBtnHeader}>AGENCY </div>
                  <div className={cs.desc}>
                    Unlock Your Full Potential with Universal Couture – We
                    Believe in Your Unique Beauty
                  </div>
                </div>
              </div>
              <div
                className={cs.secBtn2}
                onClick={() => {
                  this.props.setPage("academy");
                  setTimeout(
                    () => this.setState({ bannerClicked: false }),
                    1000
                  );
                }}
              >
                <div className={cs.secBtnBody}>
                  <div className={cs.secBtnHeader}>ACADEMY</div>
                  <div className={cs.desc}>
                    Modeling academies offer a range of classes and workshops to
                    teach aspiring models various aspects of the industry,
                    including runway walking, posing, photography, makeup
                    application, skincare, and fashion styling. These classes
                    help models refine their skills and gain confidence.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {bannerClicked && (
          <StrictMode>
            <AboutContainer />
            {/* <SingleGallery /> */}
            <EventsList events={this.props.events} />
            <ScreenFooter />
            <ScreenHeader setPage={this.props.setPage} />
          </StrictMode>
        )}
      </StrictMode>
    );
  }
}
