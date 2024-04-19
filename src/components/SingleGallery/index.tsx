import cs from "./index.module.css";
import { StrictMode, useState } from "react";

export default function SingleGallery() {
  const [selected, setselected] = useState(false);
  return (
    <StrictMode>
      <div className={cs.section4}>
        {[1, 1, 1, 1, 1, 1].map((it, k) => (
          <div
            key={k}
            className={cs.eachImage}
            onClick={() => setselected(true)}
          ></div>
        ))}
      </div>
      {selected && (
        <div className={cs.popup1}>
          <div className={cs.popupBody}>
            <div className={cs.popDetailsArea}>
              <div className={cs.popHeader}>
                Title
                <div className={cs.xBtn} onClick={() => setselected(false)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </StrictMode>
  );
}
