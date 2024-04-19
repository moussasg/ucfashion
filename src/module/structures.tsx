export class User {
  firstName = "";
  lastName = "";
  viewPassword = false;
  viewCPassword = false;
  cuntryCode = "";
  email = "";
  password = "";
  c_password = "";
  country = "";
  mobile = "";
  gender = "";
  dob = "";
  height = "";
  waist = "";
  hips = "";
  chest = "";
  image_portrait = "";
  image_portrait_side = "";
  image_fullbody = "";
  image_fullbody_side = "";
}

export class UserPayload {
  constructor(props: any) {
    this.name = props.firstName + "," + props.lastName;
    this.email = props.email;
    this.password = props.password;
    this.c_password = props.c_password;
    this.country = props.country;
    this.mobile = props.countryCode + props.mobile;
    this.gender = props.gender;
    this.dob = props.dob;
    this.height = props.height;
    this.waist = props.waist;
    this.hips = props.hips;
    this.chest = props.chest;
  }

  name = "";
  email = "";
  password = "";
  c_password = "";
  country = "";
  mobile = "";
  gender = "";
  dob = "";
  height = "";
  waist = "";
  hips = "";
  chest = "";
  image_portrait = "";
  image_portrait_side = "";
  image_fullbody = "";
  image_fullbody_side = "";
  user_type = "2";
}
