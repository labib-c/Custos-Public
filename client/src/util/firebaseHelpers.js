import {db}from '../firebase'


export function getData() {
    let data = []
    try{
        db.ref('data').on('value', (snapshot) => {
            snapshot.forEach(child => {
                let obj = JSON.parse(child.val())
                obj['key'] = child.key
                data.push(obj)
            })
        })

        return data

    } catch(err){
        console.log(err)
    }
}


export const columns = [
    { id: 'time', label: 'Time', minWidth: 20 },
    { id: 'success/failure', label: 'Success\\Failure', minWidth: 20, align: 'right' },
    {
      id: 'source user@domain',
      label: 'Source\u00a0User',
      minWidth: 20,
      align: 'right',
    },
    {
      id: 'source computer',
      label: 'Source\u00a0Computer',
      minWidth: 20,
      align: 'right',
    },
    {
      id: 'logon type',
      label: 'Logon\u00a0Type',
      minWidth: 20,
      align: 'right',
    },
    {
        id: 'destination user@domain',
        label: 'Destination\u00a0User',
        minWidth: 20,
        align: 'right',
    },
    {
        id: 'destination computer',
        label: 'Destination\u00a0Computer',
        minWidth: 20,
        align: 'right',
    },
    {
        id: 'authentication type',
        label: 'Auth\u00a0Type',
        minWidth: 20,
        align: 'right',
    },
    {
        id: 'authentication orientation',
        label: 'Auth\u00a0Orientation',
        minWidth: 20,
        align: 'right',
    },
];

export function anomaliesToRegular(data){
    const anomalies = {
        "id": "anomalies",
        "label": "Anomalous Events",
        "value": data.filter((a) => a.Anomaly === true).length,
        "color": "hsl(168, 70%, 50%)"
    }

    const reg = {
        "id": "not_anomalies",
        "label": "Regular Events",
        "value": data.filter((a) => a.Anomaly === false).length,
        "color": "hsl(168, 70%, 50%)"
    }

    return [anomalies, reg]
}

export function successVsFailures(data){
    
    const success = {
        "id": "successes",
        "label": "Successful Events",
        
        "value": data.filter((a) => a['success/failure'] === "Success").length,
        "color": "hsl(168, 70%, 50%)"
    }

    const failures = {
        "id": "failures",
        "label": "Failed Events",
        "value": data.filter((a) => a['success/failure'] === "Failure").length,
        "color": "hsl(168, 70%, 50%)"
    }

    return [success, failures]
}

function createTimeObj(map){
    let activity = []
    const obj = {
        "id": "activity",
        "color": "hsl(170, 70%, 50%)"
    }
    map.forEach((value, idx) => {
        activity.push({
            "x": idx,
            "y": value.num
        })
    })
    obj['data'] = activity
    return obj
}

export function getActivity(data){
    let map = new Map()
    data.forEach((value, index) => {
       let first_n =  Math.round(value.time / Math.pow(10, Math.floor(Math.log10(value.time)) - 4 + 1));
        if (map.has(first_n)){
            map.get(first_n).num++
        }
        else{
            map.set(first_n, {num: 1})
        }
    })
    return createTimeObj(map)
}

export function getAnomalies(data){
    let map = new Map()
    data.forEach((value, index) => {
        let first_n =  Math.round(value.time / Math.pow(10, Math.floor(Math.log10(value.time)) - 4 + 1));
        if (map.has(first_n) && value.Anomaly){
            map.get(first_n).num++
        }
        else{
            map.set(first_n, {num: 0})
        }
        
    })
    console.log(createTimeObj(map))
    return createTimeObj(map)


}
