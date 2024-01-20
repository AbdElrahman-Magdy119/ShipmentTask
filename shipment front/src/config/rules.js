export default {
  required: [(val) => !!val || "This filed is required"],
  validEmail: [
    (val) =>
      val.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      ) || "Please enter valid Email",
  ],
  validateDigits: [
    (val) => val.match(/^[0-9]{11}$/) || "Please input exactly 11 numbers!",
  ],
  validNumber: [(val) => val.match(/^[0-9]*$/) || "Please enter Numeric value"],
  validUrl: [
    (val) =>
      val.match(
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
      ) || "Please enter valid Url (https://example.com)",
  ],
  maximumFiveChar: [
    (val) => val.length <= 5 || "Please use maximum 5 characters",
  ],
  validateNext: [(val, vlaTwo) => val > vlaTwo || "pla"],
};
