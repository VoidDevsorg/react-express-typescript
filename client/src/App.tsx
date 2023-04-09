import React from 'react';

function App() {
    const [data, setData] = React.useState<any>(null);

    React.useEffect(() => {
        const queries = new URLSearchParams(window.location.search);
        (async () => {
            const ip = queries.get('ip') || await fetch('https://ipapi.co/json/').then(res => res.json()).then(data => data.ip);
            const res = await fetch('http://localhost:8080/ipinfo/' + ip);
            const data = await res.json();

            setData(data);
        })();
    }, []);

    return (
        <div className="App">
            <div className="header">
                <h1 className="subtitle">React + Express + TypeScript</h1>
                <h2>IP Info</h2>
                <p className="description">
                    Total {data ? Object.keys(data || {}).filter(key => data[key].length > 1).length : 0} records found.
                </p>
            </div>
            {data ? (
                <div className="info">
                    {Object.keys(data)
                        .filter(key => data[key].length > 1)
                        .map(key => (
                            <div id={key} key={key} className="infobox">
                                <span className="title">
                                    {key.replace(/_/g, ' ')}
                                </span>
                                <span className="content">
                                    {data[key]}
                                </span>
                            </div>
                        ))}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default App;
