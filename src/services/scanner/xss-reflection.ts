import axios from "axios";

export async function testReflection(
  endpoint: string,
  parameter: string
) {
  const payload =
    "<script>alert(1)</script>";

  try {
    const separator =
      endpoint.includes("?")
        ? "&"
        : "?";

    const url =
      `${endpoint}${separator}${parameter}=${encodeURIComponent(
        payload
      )}`;

    console.log(
      "Testing XSS:",
      url
    );

    const response =
      await axios.get(url);

    const body =
      String(
        response.data
      );

    return body.includes(
      payload
    );
  } catch (error) {
    console.error(
      "Reflection Test Error",
      error
    );

    return false;
  }
}