import { axoisInstance } from "src/http-common";
class authServices {
  logIn(data) {
    return axoisInstance.post("login", data);
  }

  register(data) {
    return axoisInstance.post("register", data);
  }


}

export default new authServices();
