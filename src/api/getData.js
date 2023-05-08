import axios from "axios";

export const getData = async (method, url, data = null) => {
  try {
    const request = await axios.request({
      method,
      url,
      data,
    });

    return request.data;
  } catch (error) {
    return error;
  }
};
