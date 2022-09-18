import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // const abortCont = new AbortController();
        const fetchData = async (url) => {
            let response = await fetch(url,/* {signal: abortCont.signal} */);
            if (!response.ok) {
                throw new Error("Couldn't fetch data from the source");
            }
            let data = await response.json();
            if (data) {
                setData(data);
                setIsPending(false);
                setError(null);
            }
        }

        setTimeout(() => {
            fetchData(url)
                .catch((err) => {
                    // if(err.name === 'AbortError') {
                    //     console.log("Fetch Aborted");
                    // }
                    // else {
                    setError(err.message);
                    setIsPending(false);
                    setData(null);
                    // }
                })
        }, 1000)

        // return () => {
        //     abortCont.abort();
        // }
    }, [url])

    return { data, isPending, error };
}

export default useFetch;