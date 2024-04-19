import { useState, useEffect, React } from "react";
import cs from "../styles/model.module.css";
import testimage from "../assets/UClogo.png";
import axios from "axios";
import Trpc from "./animtext";

export default function ModelScreen({ setPage, events, modelId }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/model/${modelId}`)
      .then((response) => {
        console.log(response.status);
        if (response.status === 404) {
          window.location.href = "/";
        } else {
          setData(response.data.data);
        }
      })
      .catch((error) => (window.location.href = "/"));
  }, [modelId]);
  return (
    <>
      <div className={cs.logo}>
        <img src={testimage} width={100} alt="Logo" />
      </div>
      <div className={cs.titlefashion}>
        <Trpc />
      </div>
      <br />
      <div className={cs.horizontallineright}></div>
      <div className={cs.horizontallineleft}></div>
      <br />
      <div className={cs.ModelScreen}>
        <div className={cs.containermodels}>
          <div className={cs.bodycaracteristic}>
            <div> {data?.height} cm</div>
            <div className={cs.gold}> height</div>
          </div>
          <div className={cs.bodycaracteristic}>
            <div> {data?.chest} cm</div>
            <div className={cs.gold}> chest</div>
          </div>
          <div className={cs.bodycaracteristic}>
            <div> {data?.waist} cm</div>
            <div className={cs.gold}>waist</div>
          </div>
          <div className={cs.bodycaracteristic}>
            <div> {data?.hips} cm</div>
            <div className={cs.gold}> hips</div>
          </div>
        </div>
      </div>
      <br />
      <section className={cs.imgmodels}>
        <div className={cs.rowone}>
          <img src={data?.image_fullbody} />
          <img src={data?.image_fullbody_side} />
          <img src={data?.image_portrait} />
          <img src={data?.image_portrait_side} />
        </div>
      </section>
    </>
  );
}
