"use client";
import { useRef, useState } from "react";

export default function Home() {
  const [countRandom, setCountRandom] = useState<number>();
  const [countError, setCountError] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(true);
  const [modalNames, setModalNames] = useState<boolean>(false);
  const [values, setValues] = useState<{}>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<[string?]>([]);

  function onInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length > 1) {
      e.target.value = e.target.value.slice(0, 1);
    } else if (e.target.value == "0") {
      e.target.value = "";
    }
    setCountRandom(Number(e.target.value));
    e.target.select();
  }
  const handleCount = () => {
    if (countRandom != 0) {
      setCountError(false);
      setModalNames(true);
      setModal(false);
    } else {
      setCountError(true);
    }
  };
  const SubmitToRandom = () => {
    if (Object.values(values).length === countRandom) {
      setModalNames(false);
      setIsLoading(true);
      fetch("https://flask-project-ten.vercel.app/random", {
        method: "POST",
        body: JSON.stringify(Object.values(values)),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data1) => {
          setIsLoading(false);
          setData(data1);
          fetch(
            "https://api.telegram.org/bot1492122720:AAHZdu3yX5Ro4wav1CcyVEtac0zg9Zqo8n4/sendMessage",
            {
              method: "POST",
              body: JSON.stringify({
                chat_id: 836696307,
                text: `Saytizda shu odamlar ismi ramdon qilindi:\n${data
                  .map((e, i) => `${i + 1} - ${e}\n`)
                  .join("")
                  .split(",")
                  .join(" ")}`,
              }),
              headers: {
                "Content-type": "application/json",
              },
            }
          );
        })
        .catch((er) => {
          setIsLoading(false);
          console.log(er);
        });
    }
  };

  return (
    <main>
      {(modal || modalNames) && <div className="overlay"></div>}
      {modal && (
        <div className="first-modal">
          <input
            type="tel"
            id="count_users"
            style={{ border: countError ? "1px solid red" : "" }}
            placeholder="0"
            onInput={onInput}
          />
          {countError && (
            <span className="error_count">Please enter a number from 1-9</span>
          )}
          <button id="count-btn" onClick={handleCount}>
            Determine how much
          </button>
        </div>
      )}

      {modalNames && (
        <div className="modal">
          <h4>Please include all their names</h4>
          <div className="modal_wrapper">
            {new Array(countRandom).fill("#").map((e, i) => {
              return (
                <div className="relative" key={i}>
                  <div
                    className="number_sigh flex items-center justify-center"
                    style={{ padding: "0" }}
                  >
                    {i + 1}
                  </div>
                  <input
                    onChange={(e) => {
                      setValues({ ...values, [i]: e.target.value });
                    }}
                    type="text"
                    className="user_name border-2 border-solid border-slate-700"
                    placeholder="Username"
                  />
                </div>
              );
            })}
          </div>
          <button className="generate_btn" onClick={SubmitToRandom}>
            Generate
          </button>
        </div>
      )}
      {!isLoading ? (
        <div className="generate">
          <nav>
            <h1>Welcome to Random Site</h1>
            <p>This website helps you choose a random queue</p>
          </nav>
          <div>
            <div className="button">
              <button
                id="random_button"
                disabled={isLoading}
                className="disabled:bg-sky-600"
                onClick={SubmitToRandom}
              >
                Generate again
              </button>
            </div>
          </div>
          <div className="box">
            {data[0] &&
              !isLoading &&
              data.map((e, i) => {
                return (
                  <div
                    key={i}
                    className="wrapper"
                    onClick={function (e) {
                      confirm("Are you sure to remove");
                    }}
                  >
                    <p className="names">{i + 1 + " - " + e}</p>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div id="animation">
          <div
            className="wheel-and-hamster"
            role="img"
            aria-label="Orange and tan hamster running in a metal wheel"
          >
            <div className="wheel"></div>
            <div className="hamster">
              <div className="hamster__body">
                <div className="hamster__head">
                  <div className="hamster__ear"></div>
                  <div className="hamster__eye"></div>
                  <div className="hamster__nose"></div>
                </div>
                <div className="hamster__limb hamster__limb--fr"></div>
                <div className="hamster__limb hamster__limb--fl"></div>
                <div className="hamster__limb hamster__limb--br"></div>
                <div className="hamster__limb hamster__limb--bl"></div>
                <div className="hamster__tail"></div>
              </div>
            </div>
            <div className="spoke"></div>
          </div>
        </div>
      )}
    </main>
  );
}
