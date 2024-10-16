// defining test modes
const stages_smoke = [
    { duration: '1m', target: 100 },
];

const stages_load = [
    { duration: '30m', target: 100 }, 
    { duration: '30m', target: 100 },
    { duration: '30m', target: 0 },
];

const stages_stress = [
    { duration: '2m', target: 20 }, 
    { duration: '2m', target: 20 },
    { duration: '2m', target: 50 }, 
    { duration: '5m', target: 50 },
    { duration: '2m', target: 120 }, 
    { duration: '5m', target: 120 },
    { duration: '2m', target: 200 }, 
    { duration: '5m', target: 200 },
    { duration: '5m', target: 0 }, 
];

const stages_soak = [
    { duration: '2m', target: 25 }, 
    { duration: '3h56m', target: 25 }, 
    { duration: '2m', target: 0 },
];

export const config = {
    base_url: "http://host.docker.internal:5098", 
    soap_action: "http://sap.com/xi/WebService/soap1.1",
    smoke: {
        stages: stages_smoke
    },
    load: {
        stages: stages_load
    },
    stress: {
        stages: stages_stress
    },
    soak: {
        stages: stages_soak
    }
};
