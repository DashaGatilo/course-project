import {useEffect, useState} from 'react';

export function useStore(getData, defaultValue) {
    const [data, setData] = useState(defaultValue);

    useEffect(() => {
        getData().then((data) => {
            setData(data);
        });
    }, []);

    return {
        data,
        refresh: () => getData().then((data) => setData(data))
    }
}