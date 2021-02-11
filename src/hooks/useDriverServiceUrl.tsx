import { useEffect, useState } from "react"

export const useDriverServiceUrl = (loadbalancerUrl: string): string => {
    const [url, setUrl] = useState("");

    const fetchNewUrl = async () => {
        const response = await fetch(loadbalancerUrl);
        const {url: driverServiceUrl}: {url: string} = await response.json()
        setUrl(driverServiceUrl)
    }

    useEffect(() => {
        fetchNewUrl()
    },[loadbalancerUrl])
    
    return url;
}

