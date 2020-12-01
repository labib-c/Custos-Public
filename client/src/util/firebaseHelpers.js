import {db}from '../firebase'

export function getData() {
    const ref = db.ref('data')
    let data = []
    try{
        ref.on('value', (snapshot) => {
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
