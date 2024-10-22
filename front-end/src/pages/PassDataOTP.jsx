import React, { useState } from "react";
import Login from "./login";
import OTP from "./OTP";
function PassDataOTP() {
  const [otp, setOTP] = useState("");
  const [email, setEmailOTP] = useState("");
  return (
    <div>
      <Login setOTP={setOTP} setEmailOTP={setEmailOTP} />
      <OTP otp={otp} email={email} />
    </div>
  );
}

export default PassDataOTP;
