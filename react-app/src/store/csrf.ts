import Cookies from "js-cookie";

export async function csrfFetch(url: string, options = <RequestInit>{}): Promise<Response> {

    options.method = options.method || "GET";

    const requestHeaders: HeadersInit = new Headers();

    if (options.method.toUpperCase() !== "GET") {
       requestHeaders.set("XSRF-Token", Cookies.get("XSRF-TOKEN"));
        if("Content-Type" in options.headers) {
            requestHeaders.set("Content-Type", options.headers["Content-Type"])
        } else {
            requestHeaders.set("Content-Type", "application/json")
        }
    }

    const res = await fetch(url, {
      headers: requestHeaders,
      ...options
    });
    console.log(res, "resbtich")
    if (res.status >= 400 ) throw res
    return res
}

export function restoreCSRF() {
    return csrfFetch("/api/csrf/restore");
}