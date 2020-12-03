import {db} from '../firebase'


export async function getData() {
    let data = []
    try{
        await db.ref('data').once('value', (snapshot) => {
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
        "value": data.filter((a) => a['success/failure'] === "Fail").length,
        "color": "hsl(168, 70%, 50%)"
    }

    return [failures, success]
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
    return createTimeObj(map)

}

export async function getCustosScore(key) {
    let data = []
    try{
        
        await db.ref("custos_score").child(key).once('value').then(snapshot => {
            data.push(JSON.parse(snapshot.val()))
        }).catch((err) => {
            console.log(err)
        })
        return modifyCustosScores(data[0])
    }
    catch(err){
        console.log(err)
    }
}

function modifyCustosScores(data) {
    let modified = []
    let min_neg =  1
    let min_pos = 1
    let max_neg = 0
    let max_pos = 0

    Object.entries(data).forEach(item => {
        if (item[1] < 0){
            if (Math.abs(item[1]) < min_neg ){
                min_neg = Math.abs(item[1])
            }
            else if(Math.abs(item[1]) > max_neg) {
                max_neg = Math.abs(item[1])
            }
        }
        else{
            if (item[1] < min_pos){
                min_pos = item[1]
            }
            else if(item[1] > max_pos){
                max_pos = item[1]
            }
        }

        
    })
    const getNormalized = (x) => {
        return Math.round((x >= 0 ? ((x - min_pos) / (max_pos - min_pos)) : -1*(( Math.abs(x) - min_neg) / (max_neg - min_neg)))*100) / 100
    }
    Object.entries(data).forEach((item) => {
        let obj = {
            "id": item[0],
            "custosScore": item[1],
            "normalized": getNormalized(item[1])
        }
        modified.push(obj)
    })

    return modified
}

export function getRelatedEvents(data, time) {
    let related = []
    for (let i = 0; i < data.length; i++){
        if (parseInt(data[i].time) > (time - 100000) && parseInt(data[i].time) < (time + 100000)){
            related.push(data[i])
        }
    }

    return related
}
