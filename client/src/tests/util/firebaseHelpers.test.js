import {getData, getActivity, getAnomalies, successVsFailures, anomaliesToRegular, getRelatedEvents, getCustosScore} from '../../util/firebaseHelpers'
const mockData = '[{"time":20325,"source user@domain":"U24@DOM1","destination user@domain":"U24@DOM1","source computer":"C1770","destination computer":"C1770","authentication type":"Negotiate","logon type":"Service","authentication orientation":"LogOn","success/failure":"Success","Anomaly":false,"key":"0"},{"time":20330,"source user@domain":"U24@DOM1","destination user@domain":"U24@DOM1","source computer":"C1770","destination computer":"C1770","authentication type":"Negotiate","logon type":"Service","authentication orientation":"LogOn","success/failure":"Success","Anomaly":false,"key":"1"}]'
it("gets data from firebase", () => {
    const data = getData()
    expect(data.length > 0)
})

it("creates activity and anomalies data", () => {
    const data = JSON.parse(mockData)
    const activity = [getActivity(data)]
    const anomalies = [getAnomalies(data)]
    expect(activity.length > 0)
    expect(anomalies.length > 0)
})

it("creates pie data", () => {
    const data = JSON.parse(mockData)
    const activity = successVsFailures(data)
    const anomalies = anomaliesToRegular(data)
    expect(activity.length == 2)
    expect(anomalies.length == 2)
})

it("gets related events", () => {
    const data = JSON.parse(mockData)
    const related = getRelatedEvents(data, 20325)
    expect(related.length == 1)
})
