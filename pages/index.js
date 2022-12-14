import Head from "next/head";
import { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import DraggableDiv from "./components/DraggableDiv";

export default function Home() {
  const [DataDisplay, setDataDisplay] = useState([]);
  const [responseObj, setresponseObj] = useState([]);
  let dataResponse;
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    if (responseObj.length > 0) {
      return;
    }
    fetch("/api/fetchData")
      .then((response) => response.json())
      .then((res) => {
        setresponseObj(res);
        dataResponse = res;
      });
  };
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "box",
    drop: (item) => pushInArr(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const pushInArr = (item) => {
    const data = dataResponse.find((e) => e.name == item.name);
    setDataDisplay((prev) => {
      return [...prev, data];
    });
  };
  const remFromArr = (name) => {
    const data = DataDisplay.filter((e) => e.name !== name);
    setDataDisplay(() => {
      return [...data];
    });
  };
  const notDragInArr = (name) => {
    const data = responseObj.filter((e) => e.name === name);
    setDataDisplay((prev) => {
      return [...prev, data[0]];
    });
  };
  const rhsFunction = () => {
    var resp = window.prompt("Input RHS");
    const data = {
      name: +resp,
      value: +resp,
      type: "RHS",
      dragable: false,
    };
    setDataDisplay((prev) => {
      return [...prev, data];
    });
  };
  const evaluate = () => {
    if (DataDisplay.length === 0) {
      window.alert("False");
    } else {
      const lastString = [];
      DataDisplay.map((e) => lastString.push(e.value));
      let answer = eval(lastString.join(""));
      window.alert(Boolean(answer));
    }
  };
  return (
    <div className="container">
      <Head>
        <title>Intern Project</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="title">
        <h1>Intern Project</h1>
      </div>
      <div className="dragalphabets">
        {responseObj.map((e) =>
          e.type === "Alphabet" ? (
            <DraggableDiv key={e.name} type={e.name} />
          ) : null
        )}
      </div>
      <div className="dragNnot">
        <div className="Signs">
          {responseObj.map((e) =>
            e.type === "Math" && e.dragable === true ? (
              <DraggableDiv class="primary" type={e.name} key={e.name} />
            ) : null
          )}
        </div>
        <div className="greaterLess">
          {responseObj.map((e) =>
            e.dragable === false && e.name !== "RHS" ? (
              <DraggableDiv
                notMovable
                onPress={() => notDragInArr(e.name)}
                class="primary"
                type={e.name}
                key={e.name}
              />
            ) : null
          )}
        </div>
        <div className="rhsInteger">
          {responseObj.map(
            (e) =>
              e.name === "RHS" && (
                <DraggableDiv
                  notMovable
                  class="primary"
                  type="RHS"
                  key={e.name}
                  onPress={rhsFunction}
                />
              )
          )}
        </div>
      </div>
      <div className="dragarea" ref={drop}>
        {DataDisplay.map((e) => {
          return e.type === "Math" ? (
            <DraggableDiv
              key={e.name}
              onPress={() => remFromArr(e.name)}
              class="primary"
              type={e.name}
            />
          ) : (
            <DraggableDiv
              key={e.name}
              onPress={() => remFromArr(e.name)}
              type={e.name}
            />
          );
        })}
      </div>
      <div className="evaluate" onClick={evaluate}>
        Evaluate
      </div>
      <div className="instructions">
        <h1>Important instructions</h1>
        <p>Value of A=5</p>
        <p>Value of B=10</p>
        <p>Value of C=15</p>
        <p>Value of D=20</p>
        <p>Value of E=25</p>


        <p>Drag A,B,C,D,E</p>
        <p>Click one time on greater and smaller than arrows to include in playground</p>
        <p>Click one time on ABCDE +-/* in playground to remove</p>
        <p>Nodejs Server is hosted on ec2 with api gateway</p>
        <p>Mongodb atlas is acting as database</p>
        <p>Hosted on vercel</p>
        <a href="https://github.com/Mithilesh-create/internBackend">Server code</a><br/>
        <a href="https://github.com/Mithilesh-create/internFrontend">Frontend code</a><br/>
        <a href="https://mithilesh-portfolio.vercel.app/">Portfolio</a><br/>
        <p></p>
        <h1>Created by Mithilesh Sharma</h1>
      </div>
    </div>
  );
}
