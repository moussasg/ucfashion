import cs from "./index.module.css";

export default function AboutContainer() {
  return (
    <div className={cs.section3}>
      <div className={cs.leftArea}>
        <div className={cs.title}>About Us</div>
        <div className={cs.desc}>
          Universal Couture is a premier exhibition organizing company based in
          the vibrant city of Dubai, at the crossroads of innovation and
          commerce. With an unwavering commitment to excellence and a track
          record of successful events, we are a trusted partner for businesses
          seeking to showcase their offerings on a global stage.
        </div>
        <div className="blackBtn">Contect Us</div>
      </div>
      <div className={cs.rightArea}></div>
    </div>
  );
}
