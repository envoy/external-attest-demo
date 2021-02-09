const { EnvoyAPI } = require('@envoy/envoy-integrations-sdk');

async function run(accessToken, locationId, employeeEmail, employeeName, arrivalTime) {
    const userAPI = new EnvoyAPI(accessToken);
    const { data: [flow] } = await userAPI.request({
        url: '/api/v3/flows',
        qs: {
            filter: {
                location: locationId,
                employee_centric: true
            },
        },
    });
    if (!flow) {
        throw new Error('No employee flow found.');
    }
    const invite = {
        data: {
            attributes: {
                attested: true,
                email: employeeEmail,
                'full-name': employeeName,
                'expected-arrival-time': arrivalTime, // ISO-8601
                'user-data': [],
            },
            relationships: {
                location: {
                    data: {
                        type: 'locations',
                        id: locationId,
                    },
                },
                flow: {
                    data: {
                        type: 'flows',
                        id: flow.id,
                    },
                },
            },
            type: 'invites',
        },
    };

    return userAPI.request({
        method: 'POST',
        url: '/api/v3/invites',
        body: invite,
    });
}

const accessToken = '';
const locationId = 1;
const employeeEmail = '';
const employeeName = '';
const arrivalTime = '2021-02-09T14:18:59-05:00';
run(accessToken, locationId, employeeEmail, employeeName, arrivalTime).then(console.log).catch(console.log)
