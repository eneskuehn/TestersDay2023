import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    scenarios: {
        post: {
          executor: 'constant-vus',
          exec: 'post',
          vus: 3,
          duration: '20s',
        },
        get: {
          executor: 'constant-vus',
          exec: 'get',
          vus: 1,
          duration: '20s',
        },
      },
};

const headerParams = {
    headers: { "Content-Type": "application/json" },
};

const data = 
{
    name: "Anoying Guy",
    email: "Loadinho@email.com",
    phone: "01402 619211",
    subject: "Booking enquiry",
    description: "DO YOU HAVE ROOMS OR CANDY??"
};

export function post() {

    const resPost = http.post("https://automationintesting.online/message/", JSON.stringify(data), headerParams);
    check(resPost, {
        "is status 201": (r) => r.status === 201,  
    });

    sleep(1);

}

export function get() {

    const resGet = http.get("https://automationintesting.online/message/", headerParams);
    check(resGet, {
        "is status 200": (r) => r.status === 200,
        "is number of messages > 0": (r) => r.json(["messages"]).length > 0,
    });

    sleep(1);
}
