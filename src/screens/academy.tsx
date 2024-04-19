import { Component, createRef } from "react";
import AboutContainer from "../components/about";
import ScreenHeader, { ScreenFooter } from "../components/foot&head";
import cs from "../styles/academy.module.css";
import { User, UserPayload } from "../module/structures";
import { countryList, countrycodes } from "../statics/country";
import { uploadToFirebase } from "../module/initFirebase";
import axios from "axios";
import EventsList from "../components/SingleEvent";

export default class AcademyScreen extends Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isRegPop: false,
      isSuccesPop: false,
      userForm: new User(),
      loading: true,
      models: [],
    };
    this.profilePicRef = createRef();
  }
  profilePicRef: any;
  refImg: any = createRef();
  refImg1: any = createRef();
  refImg2: any = createRef();
  refImg3: any = createRef();

  async componentDidMount() {
    await axios
      .get("https://api.avidhilda.com/api/model")
      .then((res) => {
        console.log(res.data.data);
        this.setState({ models: res.data.data });
      })
      .catch(() => {});
    this.setState({ loading: false });
  }

  _setValue = (e: any, prop: any) => {
    const { userForm }: any = this.state;
    userForm[prop] = e.target.value;
    this.setState({ userForm });
  };

  _setFile = (e: any, prop: any) => {
    const { userForm }: any = this.state;
    userForm[prop] = e.target.files[0];
    this.setState({ userForm });
    // uploadToFirebase(e.target.files[0]).then((url: any) => console.log(url));
  };

  _onSubmitUserForm = async (e: any) => {
    e.preventDefault();
    const { userForm, loading }: any = this.state;
    if (loading) return;
    this.setState({ loading: true });
    const { firstName, lastName, email, password, c_password }: any = userForm;
    const { country, mobile, gender, dob, height, waist, hips }: any = userForm;
    const { chest, image_portrait, image_portrait_side }: any = userForm;
    const { image_fullbody, image_fullbody_side }: any = userForm;

    var _error = "";
    if (firstName === "") _error = "Enter first name";
    if (lastName === "") _error = "Enter last name";
    if (email === "") _error = "Enter email";
    if (email.split(".").length < 2) _error = "Not a valid email";
    if (email.split("@").length < 2) _error = "Not a valid email";
    if (password === "") _error = "Enter password";
    if (c_password === "") _error = "Enter confirm password";
    if (password !== c_password) _error = "Password is diffrent";
    if (country === "") _error = "Select country";
    if (mobile === "") _error = "Enter mobile";
    if (gender === "") _error = "Select gender";
    if (dob === "") _error = "Enter date of birth";
    if (height === "") _error = "Enter height";
    if (waist === "") _error = "Enter waist";
    if (hips === "") _error = "Enter hips";
    if (chest === "") _error = "Enter chest";
    if (image_portrait === "") _error = "Upload all photos";
    if (image_portrait_side === "") _error = "Upload all photos";
    if (image_fullbody === "") _error = "Upload all photos";
    if (image_fullbody_side === "") _error = "Upload all photos";

    this.setState({ error: _error });
    if (_error === "") {
      const body = new UserPayload(userForm);
      await Promise.all([
        uploadToFirebase(image_portrait).then(
          (url: any) => (body.image_portrait = url)
        ),
        uploadToFirebase(image_portrait_side).then(
          (url: any) => (body.image_portrait_side = url)
        ),
        uploadToFirebase(image_fullbody).then(
          (url: any) => (body.image_fullbody = url)
        ),
        uploadToFirebase(image_fullbody_side).then(
          (url: any) => (body.image_fullbody_side = url)
        ),
      ]);
      await axios
        .post("https://api.avidhilda.com/api/register", body)
        .then(() => {
          this.setState({
            userForm: new User(),
            isSuccesPop: true,
            isRegPop: false,
          });
        })
        .catch((e) => {
          this.setState({
            error: e.response.data.message ?? "Error on uploading your files",
          });
        });
    }
    this.setState({ loading: false });
  };

  render() {
    const { isRegPop, userForm, error, loading, isSuccesPop }: any = this.state;
    const { models }: any = this.state;
    return (
      <div className={cs.body}>
        <div className={cs.banner}>
          <div className={cs.bannerBody}>
            <div className={cs.bannerTxt2}>JOIN US</div>
            <div className={cs.bannerTxt1}>We Create Models</div>
            <div className={cs.bannerTxt3}>UC ACADEMY</div>
            <div
              className={cs.regBtn}
              onClick={() => this.setState({ isRegPop: true })}
            >
              REGISTER AS A MODEL
            </div>
          </div>
        </div>
        <div
          onClick={() => this.setState({ isSuccesPop: false })}
          className={isSuccesPop ? cs.succesPop : cs.succesPop_}
        >
          <div className={cs.succesPopBody}>
            Congratulations on successfully registering!
            <br />
            Welcome to our community. We're thrilled to have you here, and we
            can't wait to embark on this journey together
          </div>
        </div>
        <div className={isRegPop ? cs.register : cs.register_}>
          <div className={cs.regPopup}>
            <div className={cs.regHeader}>
              Sign Up
              <div
                className={cs.closeBtn}
                onClick={() => this.setState({ isRegPop: false })}
              />
            </div>
            <form className={cs.regBody} onSubmit={this._onSubmitUserForm}>
              <div className={cs.regDesc}>
                To start the process of becoming a model, you are required to
                fill out an application form and provide us with some
                information along with polaroid photographs. These photos should
                be captured naturally (not edited), in the daylight, without any
                makeup - photos taken with your phone are totally fine. Please
                ensure that the pictures you provide are no more than 3 months
                old and clearly depict your current appearance, hairstyle and
                hair length.
              </div>
              <div className={cs.regSubTitle}>Personal Information</div>
              <div className={cs.formMainRow}>
                <div className={cs.formLeft}>
                  <div className={cs.formRow}>
                    <div>First Name *</div>
                    <input
                      onChange={(e: any) => this._setValue(e, "firstName")}
                      value={userForm.firstName}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className={cs.formRow}>
                    <div>Last Name *</div>
                    <input
                      onChange={(e: any) => this._setValue(e, "lastName")}
                      value={userForm.lastName}
                      placeholder="Enter last name"
                    />
                  </div>
                  <div className={cs.formRow}>
                    <div>Gender *</div>
                    <select
                      onChange={(e: any) => this._setValue(e, "gender")}
                      value={userForm.gender}
                    >
                      <option hidden>Select gender</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                  <div className={cs.formRow}>
                    <div>Date of birth *</div>
                    <input
                      type="date"
                      onChange={(e: any) => this._setValue(e, "dob")}
                      value={userForm.dob}
                    />
                  </div>
                  <div className={cs.formRow}>
                    <div>Mobile *</div>
                    <select
                      style={{ width: 70 }}
                      onChange={(e: any) => this._setValue(e, "cuntryCode")}
                      value={userForm.cuntryCode}
                    >
                      {countrycodes.map((it: any, k: any) => (
                        <option key={k} value={it.value}>
                          {it.value}
                        </option>
                      ))}
                    </select>
                    <input
                      style={{ width: "calc(60% - 120px)" }}
                      placeholder="156xxxx89"
                      type="number"
                      onChange={(e: any) => this._setValue(e, "mobile")}
                      value={userForm.mobile}
                    />
                  </div>
                  <div className={cs.formRow}>
                    <div>Email *</div>
                    <input
                      placeholder="example@testmail.com"
                      type="email"
                      onChange={(e: any) => this._setValue(e, "email")}
                      value={userForm.email}
                    />
                  </div>
                  <div className={cs.formRow}>
                    <div>Create password *</div>
                    <input
                      placeholder="********"
                      type={userForm.viewPassword ? "" : "password"}
                      onChange={(e: any) => this._setValue(e, "password")}
                      value={userForm.password}
                    />
                    <div
                      className={
                        userForm.viewPassword ? cs.eyeIcon_ : cs.eyeIcon
                      }
                      onClick={() => {
                        userForm.viewPassword = !userForm.viewPassword;
                        this.setState({ userForm });
                      }}
                    />
                  </div>
                  <div className={cs.formRow}>
                    <div>Confirm password *</div>
                    <input
                      placeholder="********"
                      type={userForm.viewCPassword ? "" : "password"}
                      onChange={(e: any) => this._setValue(e, "c_password")}
                      value={userForm.c_password}
                    />
                    <div
                      className={
                        userForm.viewCPassword ? cs.eyeIcon_ : cs.eyeIcon
                      }
                      onClick={() => {
                        userForm.viewCPassword = !userForm.viewCPassword;
                        this.setState({ userForm });
                      }}
                    />
                  </div>
                </div>
                {/* <div className={cs.formRight}>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    ref={this.profilePicRef}
                  />
                  <div
                    className={cs.profilePic}
                    onClick={() => this.profilePicRef?.current?.click()}
                  />
                  Add your profile picture
                </div> */}
              </div>
              <div className={cs.regSubTitle}>Model Information</div>
              <div className={cs.formMainRow}>
                <div className={cs.formLeft}>
                  <div className={cs.formRow}>
                    <div>Height (cm)</div>
                    <input
                      placeholder="0.00"
                      type="number"
                      onChange={(e: any) => this._setValue(e, "height")}
                      value={userForm.height}
                    />
                  </div>
                  <div className={cs.formRow}>
                    <div>Waist (cm)</div>
                    <input
                      placeholder="0.00"
                      type="number"
                      onChange={(e: any) => this._setValue(e, "waist")}
                      value={userForm.waist}
                    />
                  </div>
                  <div className={cs.formRow}>
                    <div>Hips (cm)</div>
                    <input
                      placeholder="0.00"
                      type="number"
                      onChange={(e: any) => this._setValue(e, "hips")}
                      value={userForm.hips}
                    />
                  </div>
                  <div className={cs.formRow}>
                    <div>Chest (cm)</div>
                    <input
                      placeholder="0.00"
                      type="number"
                      onChange={(e: any) => this._setValue(e, "chest")}
                      value={userForm.chest}
                    />
                  </div>
                  <div className={cs.formRow}>
                    <div>Country Based</div>
                    <select
                      value={userForm.country}
                      onChange={(e: any) => this._setValue(e, "country")}
                    >
                      <option hidden>Select Country</option>
                      {countryList.map((it: any, k) => (
                        <option key={k} value={it.code}>
                          {it.name} ({it.code})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className={cs.photoUploadList}>
                <div
                  className={cs.imgArea}
                  onClick={() => this.refImg?.current?.click()}
                >
                  <div className={cs.imgTitle}>Portrait Photo</div>
                  <div
                    className={
                      userForm.gender === "Male" ? cs.imgImg_ : cs.imgImg
                    }
                  />
                  <div className={cs.imgInput}>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      ref={this.refImg}
                      onChange={(e: any) => this._setFile(e, "image_portrait")}
                    />
                    <div className={cs.imgChooseFile}>Choose File</div>
                    <div className={cs.imgChoosed}>
                      {userForm.image_portrait === ""
                        ? "No file chosen"
                        : userForm.image_portrait.name}
                    </div>
                  </div>
                </div>
                <div
                  className={cs.imgArea}
                  onClick={() => this.refImg1?.current?.click()}
                >
                  <div className={cs.imgTitle}>Portrait Side Photo</div>
                  <div
                    className={
                      userForm.gender === "Male" ? cs.imgImg1_ : cs.imgImg1
                    }
                  />
                  <div className={cs.imgInput}>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      ref={this.refImg1}
                      onChange={(e: any) =>
                        this._setFile(e, "image_portrait_side")
                      }
                    />
                    <div className={cs.imgChooseFile}>Choose File</div>
                    <div className={cs.imgChoosed}>
                      {userForm.image_portrait_side === ""
                        ? "No file chosen"
                        : userForm.image_portrait_side.name}
                    </div>
                  </div>
                </div>
                <div
                  className={cs.imgArea}
                  onClick={() => this.refImg2?.current?.click()}
                >
                  <div className={cs.imgTitle}>Full-body Photo</div>
                  <div
                    className={
                      userForm.gender === "Male" ? cs.imgImg2_ : cs.imgImg2
                    }
                  />
                  <div className={cs.imgInput}>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      ref={this.refImg2}
                      onChange={(e: any) => this._setFile(e, "image_fullbody")}
                    />
                    <div className={cs.imgChooseFile}>Choose File</div>
                    <div className={cs.imgChoosed}>
                      {userForm.image_fullbody === ""
                        ? "No file chosen"
                        : userForm.image_fullbody.name}
                    </div>
                  </div>
                </div>
                <div
                  className={cs.imgArea}
                  onClick={() => this.refImg3?.current?.click()}
                >
                  <div className={cs.imgTitle}>Full-body Side Photo</div>
                  <div
                    className={
                      userForm.gender === "Male" ? cs.imgImg3_ : cs.imgImg3
                    }
                  />
                  <div className={cs.imgInput}>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      ref={this.refImg3}
                      onChange={(e: any) =>
                        this._setFile(e, "image_fullbody_side")
                      }
                    />
                    <div className={cs.imgChooseFile}>Choose File</div>
                    <div className={cs.imgChoosed}>
                      {userForm.image_fullbody_side === ""
                        ? "No file chosen"
                        : userForm.image_fullbody_side.name}
                    </div>
                  </div>
                </div>
              </div>
              <div className={cs.formFooter}>
                <div>{error}</div>
                <button
                  type="reset"
                  className="blackBorderBtn"
                  disabled={loading}
                  onClick={() => this.setState({ userForm: new User() })}
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className={loading ? "blackBtn_" : "blackBtn"}
                  disabled={loading}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* //////////////////////////////////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////////////////////////////////// */}
        <div className={cs.modelsGallery}>
          <div className={cs.title}>Models Portfolio</div>
          <div className={cs.modelsGalleryBody}>
            {models?.map((it: any, k: any) => (
              <div key={k} className={cs.eachModel}>
                <img className={cs.eachModelImage} src={it?.image_fullbody} />
                <div className={cs.detailsDiv}>
                  <div>
                    <b>Name</b>
                  </div>
                  {it?.height && (
                    <div>
                      {it?.height} cm
                      <br />
                      height
                    </div>
                  )}
                  {it?.weight && (
                    <div>
                      {it?.weight} cm
                      <br />
                      chest
                    </div>
                  )}
                  {it?.waist && (
                    <div>
                      {it?.waist} cm
                      <br />
                      waist
                    </div>
                  )}
                  {it?.hips && (
                    <div>
                      {it?.hips} cm
                      <br />
                      hips
                    </div>
                  )}
                  {it?.shoesize && (
                    <div>
                      {it?.shoesize} cm
                      <br />
                      shoe size
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* //////////////////////////////////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////////////////////////////////// */}
        <AboutContainer />
        <EventsList events={this.props.events} />
        <ScreenFooter />
        <ScreenHeader setPage={this.props.setPage} />
      </div>
    );
  }
}
