import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/form';
import UrlForm from './components/url_form';

interface Data {
  name: string,
  email: string
}

interface ItemData {
  img_src: string,
  title: string,
  price: string
}

function App() {
  const [InputData, setInputData] = useState<Data>({
    name: "",
    email: "",
  });
  const [TestData, setTestData] = useState<string | null>("init");
  // for url_form
  const [UrlData, setUrlData] = useState<string>("");
  const [ConfirmationData, setConfirmationData] = useState<ItemData | null>(null)
  ///
  const getData = async () => {

    // both ways work
    console.log("send /test request to flask")
    const response = await fetch('/test')
    const data = await response.text()
    console.log(data)
    setTestData(data)
    console.log("get /test complete")
    // await fetch('/test')
    //   .then(response => response.text())
    //   .then(data => {
    //     console.log(data)
    //     setTestData(data)
    //   })
  }
  ///
  const handleInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({
      ...InputData,
      [e.target.name]: e.target.value,
    })
  }
  const postInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("postInputData func ///");
    console.log(InputData);
    console.log(JSON.stringify(InputData))
    fetch('/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json, text/plain, */*',
      },
      body: JSON.stringify(InputData)
    })
      .then((response) => {
        console.log(response.statusText)
        console.log(response.status)
        if (response.statusText === "OK" && response.status >= 200 && response.status < 300) {
          return response.text()
        } else {
          throw new Error("Server can't be reached!")
        }
      })
      .then(data => {
        console.log('Success:', data);
        setTestData(data)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  ///
  const handleUrlData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlData(e.target.value)
  }

  const postUrlData = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("postUrlData func ///");
    console.log(UrlData);
    console.log(JSON.stringify(UrlData))
    fetch('/hello', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json, text/plain, */*',
      },
      body: JSON.stringify(UrlData)
    })
      .then((response) => {
        console.log(response.statusText)
        console.log(response.status)
        if (response.statusText === "OK" && response.status >= 200 && response.status < 300) {
          return response.text()
        } else {
          throw new Error("Server can't be reached!")
        }
      })
      .then(data => {
        console.log('Success:', data);
        console.log(JSON.parse(data).img_src)
        setConfirmationData(JSON.parse(data))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <div className="App">

      <h1>React front end</h1>
      <h2>{TestData}</h2>
      <h2>Name: {InputData.name}</h2>
      <h2>Email: {InputData.email} </h2>
      <Form InputData={InputData} handleInputData={handleInputData} postInputData={postInputData} getData={getData} />
      <h2>{ConfirmationData?.img_src}</h2>
      <UrlForm UrlData={UrlData} handleUrlData={handleUrlData} postUrlData={postUrlData} ConfirmationData={ConfirmationData} />
    </div>
  );
}

export default App;
