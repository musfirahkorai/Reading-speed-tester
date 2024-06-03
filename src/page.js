import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function Home() {
  return (
    <div>
      <h1>Reading Speed Tester</h1>
      <nav>
        <ul>
          <li><a href="/test" data-link>Start Test</a></li>
          <li><a href="/results" data-link>View Results</a></li>
        </ul>
      </nav>
    </div>
  );
}

function Test () {
  const [startTime, setstartTime] = useState(null)
  const [endTime, setEndTime] = useState(null);
  const [text, setText] = useState("This is a sample text for testing your reading speed. Read it as fast as you can and click the button when you're done.");
  const router = useRouter();
}
  const startTest = () => {
    setstartTime(Date.now());
    setEndTime(null);
  };

  const endTest = () => {
    const ens = Date.now();
    setEndTime(end);
    const timeTaken = (end - startTime) / 1000;
    const results = JSON.parse(localStorage.getItem('results')) || [];
    results.push({ text, timeTaken });
    localStorage.setItem('results', JSON.stringify(results));
    router.push('/?results');
  };

 
return (
    <div>
      <h1>Reading Speed Test</h1>
      <p>{text}</p>
      <button onClick={startTest} disabled={startTime !== null}>Start</button>
      <button onClick={endTest} disabled={startTime === null || endTime !== null}>Done</button>
      {endTime && <p>Time taken: {(endTime - startTime) / 1000} seconds</p>}
    </div>
  );


  function Results() {
    const [results, setResults] = useState([]);
  
    useEffect(() => {
      const data = JSON.parse(localStorage.getItem('results')) || [];
      setResults(data);
    }, []);
  
    return (
      <div>
        <h1>Reading Speed Results</h1>
        <table>
          <thead>
            <tr>
              <th>Text</th>
              <th>Time Taken (seconds)</th>
            </tr>
          </thead>
          <tbody>
            {results.map((entry, index) => (
              <tr key={index}>
                <td>{entry.text}</td>
                <td>{entry.timeTaken}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default function App() {
    const router = useRouter();
    const { pathname } = router;
  
    let Component;
  
    if (pathname === '/test') {
      Component = Test;
    } else if (pathname === '/results') {
      Component = Results;
    } else {
      Component = Home;
    }
  
    return <Component />;
  }