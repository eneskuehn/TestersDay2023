import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    //  stages: [
    //          { target: 20, duration: '1m' },
    //          { target: 15, duration: '1m' },
    //          { target: 0, duration: '1m' },
    //  ],
    "iterations": 100,
    "vus": 100,
    thresholds: {
        http_req_failed: ['rate < 0.1'], //request failure rate < 10%
    },
};

export function setup() {
    console.log("Hello world! I'm gonna start the test now!");
}

export default function () {

    var headerParams = {
        headers: { "Content-Type": "application/json" },
      };

    let data = 
    {
        name: "Tester's Day 2023",
        email: "LoadNinja@email.com",
        phone: "01402 619211",
        subject: "Booking enquiry",
        description: "I would like to book a room at your place"
    }

    const res = http.post("https://automationintesting.online/message/", JSON.stringify(data), headerParams);

    console.log("Message ID: " + res.json(["messageid"]));

    
    check(res, {
        "is status 201": (r) => r.status === 201,
        "is message ID > 0": (r) => r.json(["messageid"]) > 0,
        "is message correct": (r) => r.json(["description"]) === data.description    
        }
    );
    
}

export function teardown() {
    console.log("Testing ended ٩(^‿^)۶");
}
