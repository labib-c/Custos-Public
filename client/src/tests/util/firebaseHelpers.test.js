import {getData, getActivity, getAnomalies, successVsFailures, anomaliesToRegular} from '../../util/firebaseHelpers'

it("gets data from firebase", () => {
    const data = getData()
    expect(data.length > 0)
})

it("creates activity and anomalies data", () => {
    const data = getData()
    const activity = [getActivity(data)]
    const anomalies = [getAnomalies(data)]
    expect(activity.length > 0)
    expect(anomalies.length > 0)
})

it("creates pie data", () => {
    const data = getData()
    const activity = successVsFailures(data)
    const anomalies = anomaliesToRegular(data)
    expect(activity.length == 2)
    expect(anomalies.length == 2)
})