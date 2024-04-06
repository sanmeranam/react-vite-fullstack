import React, { useState } from 'react'

export default function Home() {
    const [data, setData] = useState([])

    const fetchData = async () => {
        try {
            const response = await fetch('/api/users')
            const data = await response.json()
            setData(data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>Home
            <code>
                <pre>
                    {JSON.stringify(data, null, 2)}
                </pre>
            </code>
            <button onClick={()=>fetchData()}>Fetch</button>
        </div>
    )
}
