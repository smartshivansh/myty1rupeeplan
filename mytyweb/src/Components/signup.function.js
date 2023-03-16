import axios from "axios";
import { v4 } from "uuid";

export let signupName = "";
export let signupEmail = "";
export let signupInfo = {};
export let signupUsername = "";
export let userId = "";

import {api}  from "../constants/apis";

export async function verifyCaptcha(token) {
  try {
    const res = await axios.post(`${api}/auth/recaptcha`, { token });
    if (res.status === 200) {
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function requestForVerificationOTP({ name, emailOrPhone }) {
  const data = Number(emailOrPhone)
    ? { mobile: emailOrPhone, name, email: null }
    : { email: emailOrPhone, name, mobile: null };

    console.log(emailOrPhone, data)

  try {
    const res = await axios.post(`${api}/auth/signup/request-otp`, data);
    signupName = name;
    // signupEmail = email;
    signupInfo = data;
    // console.log("data after otp send or not ", res.data);
    // console.log(res.status);
    if (res.status === 201) {
      return true;
    }

    return false;
  } catch (error) {
    if (
      error.response.status === 400 &&
      error.response.data === "DUPLICATE_EMAIL"
    ) {
      throw new Error("Some user already is Registered with this email.");
    } else if (
      error.response.status === 400 &&
      error.response.data === "DUPLICATE_MOBILE"
    ) {
      throw new Error("Some user already is Registered with this mobile.");
    }
    if (error.response.status > 500) {
      throw new Error(
        "There could be some issue with our server or your internet. Please try again later."
      );
    }

    return false;
  }
}

export async function confirmOTP({ otp }) {
  try {
    const res = await axios.patch(`${api}/auth/signup/confirm-otp`, {
      ...signupInfo,
      otp,
    });
    console.log(res.status);
    if (res.status === 200) {
      return true;
    }

    return false;
  } catch (error) {
    console.log(error.response.status);
    console.log(error.response.data);
    if (
      error.response.status === 400 &&
      error.response.data === "OTP_MISMATCH"
    ) {
      throw new Error("This OTP does not match with what we've sent.");
    }
    if (error.response.status > 500) {
      throw new Error(
        "There could be some issue with our server or your internet. Please try again later."
      );
    }
    return false;
  }
}

export async function submitUserInformation({ username, password }) {
  try {
    const res = await axios.post(`${api}/auth/signup/submit-user`, {
      ...signupInfo,
      name: signupName,
      username,
      password,
    });

    userId = res.data.user._id;
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userId", res.data.user._id);
    localStorage.setItem("username", res.data.user.username);
    localStorage.setItem("userName", res.data.user.name);

    signupUsername = res.data.user.username;

    console.log(res.status);
    if (res.status === 201) {
      return true;
    }

    return false;
  } catch (error) {
    console.log(error.response.status);
    console.log(error.response.data);
    if (
      error.response.status === 400 &&
      error.response.data === "DUPLICATE_USERNAME"
    ) {
      throw new Error("Username is already used.");
    }
    if (error.response.status >= 500) {
      throw new Error(
        "There could be some issue with our server or your internet. Please try again later."
      );
    }
    return false;
  }
}

export async function submitProfileInformation({ age, avatar }) {
  try {
    const res = await axios.post(`${api}/auth/signup/submit-profile`, {
      user_id: userId,
      age,
      avatar,
    });
    console.log(res.status);
    if (res.status === 201) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error.response.status);
    console.log(error.response.data);
    if (error.response.status > 500) {
      throw new Error(
        "There could be some issue with our server or your internet. Please try again later."
      );
    }

    return false;
  }
}

export async function submitPlanInformation(plan) {
  try {
    const res = await axios.patch(`${api}/auth/signup/submit-plan`, {
      user_id: userId,
      userData: {
        plan: plan.title.toLowerCase(),
      },
    });

    if (res.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error.response.status);
    console.log(error.response.data);
    if (error.response.status > 500) {
      throw new Error(
        "There could be some issue with our server or your internet. Please try again later."
      );
    }

    return false;
  }
}

export async function submitDemoTrialPlanInformation(code) {
  const randomSubdomain = v4().split("-")[0];

  const miniUsername = signupUsername.slice(0, -2) ?? "demo";

  const userData = {
    plan: "demo",
    subdomain: miniUsername + randomSubdomain,
    subdomainInfo: {
      createdAt: new Date(),
    },
  };

  try {
    const res = await axios.patch(`${api}/auth/signup/redeem-demo-plan`, {
      user_id: userId,
      code,
      userData,
    });
    if (res.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    if (
      error.response.status === 400 &&
      error.response.data === "CODE_NOT_AVAILABLE"
    ) {
      throw new Error("This code is expired.");
    }
    if (error.response.status > 500) {
      throw new Error(
        "There could be some issue with our server or your internet. Please try again later."
      );
    }
    return false;
  }
}

export async function submitFreeTrialPlanInformation() {
  const userData = {
    plan: "trial",
    subdomain: "",
    subdomainInfo: {
      createdAt: new Date(),
    },
  };

  try {
    const res = await axios.patch(`${api}/auth/signup/submit-plan`, {
      user_id: userId,
      userData,
    });
    if (res.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    if (error.response.status > 500) {
      throw new Error(
        "There could be some issue with our server or your internet. Please try again later."
      );
    }

    return false;
  }
}

export async function submitPlanRequest(plan) {
  console.log(plan);

  const userData = {
    plan: plan,
  };

  try {
    const res = await axios.patch(`${api}/auth/signup/request-plan`, {
      user_id: userId,
      userData,
    });
    if (res.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    if (error.response.status > 500) {
      throw new Error(
        "There could be some issue with our server or your internet. Please try again later."
      );
    }

    return false;
  }
}

export async function submitInterestInformation(interests) {
  try {
    const res = await axios.patch(`${api}/auth/signup/submit-interests`, {
      user_id: userId,
      interests,
    });
    if (res.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error.response.status);
    console.log(error.response.data);
    if (error.response.status > 500) {
      throw new Error(
        "There could be some issue with our server or your internet. Please try again later."
      );
    }

    return false;
  }
}
