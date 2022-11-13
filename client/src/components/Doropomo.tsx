import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";

export const Doropomo = () => {
  const [breakCount, setBreakCount] = useState<number>(25);
  const [shortSessionCount, setShortSessionCount] = useState<number>(5);
  const [longSessionCount, setLongSessionCount] = useState<number>(15);
  const [clockCount, setClockCount] = useState<number>(25 * 60);
  const [currentTimer, setCurrentTimer] = useState<string>("Break");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const audioBeep = useRef<HTMLAudioElement>(null);
  let loop: string | number | NodeJS.Timeout | undefined = undefined;
  useEffect(() => {
    if (!isPlaying) {
      clearInterval(loop);
    } else {
      loop = setInterval(() => {
        if (clockCount === 0) {
          if (audioBeep.current !== null) audioBeep.current.play();
          if (currentTimer === "Break") {
            setCurrentTimer("Short Session");
            setClockCount(shortSessionCount * 60);
          } else if (currentTimer === "Short Session") {
            setCurrentTimer("Long Session");
            setClockCount(longSessionCount * 60);
          } else if (currentTimer === "Long Session") {
            setCurrentTimer("Break");
            setClockCount(breakCount * 60);
          }
        } else {
          setClockCount((clockCount) => clockCount - 1);
        }
      }, 1000);
    }
    return () => clearInterval(loop);
  }, [isPlaying, clockCount]);
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setBreakCount(25);
    setShortSessionCount(5);
    setLongSessionCount(15);
    setClockCount(25 * 60);
    setCurrentTimer("Break");
    setIsPlaying(false);

    if (audioBeep.current !== null) {
      audioBeep.current.pause();
      audioBeep.current.currentTime = 0;
    }
    clearInterval(loop);
  };

  const handleBreakDecrease = () => {
    if (breakCount > 1) {
      let newCount = breakCount - 1;

      setBreakCount(newCount);
      if (currentTimer === "Break" && !isPlaying) {
        setClockCount(newCount * 60);
      }
    }
  };
  const handleBreakIncrease = () => {
    if (breakCount > 1) {
      let newCount = breakCount + 1;

      setBreakCount(newCount);
      if (currentTimer === "Break" && !isPlaying) {
        setClockCount(newCount * 60);
      }
    }
  };

  const handleShortSessionDecrease = () => {
    if (shortSessionCount > 1) {
      let newCount = shortSessionCount - 1;

      setShortSessionCount(newCount);
      if (currentTimer === "Short Session" && !isPlaying) {
        setClockCount(newCount * 60);
      }
    }
  };
  const handleShortSessionIncrease = () => {
    if (shortSessionCount > 1) {
      let newCount = shortSessionCount + 1;

      setShortSessionCount(newCount);
      if (currentTimer === "Short Session" && !isPlaying) {
        setClockCount(newCount * 60);
      }
    }
  };

  const handleLongSessionDecrease = () => {
    if (longSessionCount > 1) {
      let newCount = longSessionCount - 1;

      setLongSessionCount(newCount);
      if (currentTimer === "Long Session" && !isPlaying) {
        setClockCount(newCount * 60);
      }
    }
  };
  const handleLongSessionIncrease = () => {
    if (longSessionCount > 1) {
      let newCount = longSessionCount + 1;

      setLongSessionCount(newCount);
      if (currentTimer === "Long Session" && !isPlaying) {
        setClockCount(newCount * 60);
      }
    }
  };

  const convertToTime = (count: number) => {
    let minutes: string | number = Math.floor(count / 60);
    let seconds: string | number = count % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${minutes}:${seconds}`;
  };

  const breakProps = {
    id: "break",
    title: "Break Length",
    count: breakCount,
    handleDecrease: handleBreakDecrease,
    handleIncrease: handleBreakIncrease,
  };
  const shortSessionProps = {
    id: "short_session",
    title: "Short Session Length",
    count: shortSessionCount,
    handleDecrease: handleShortSessionDecrease,
    handleIncrease: handleShortSessionIncrease,
  };

  const longSessionProps = {
    id: "long_session",
    title: "Long Session Length",
    count: longSessionCount,
    handleDecrease: handleLongSessionDecrease,
    handleIncrease: handleLongSessionIncrease,
  };

  return (
    <div>
      <h1>25 + 5 Clock</h1>
      <div className="flex">
        <SetTimer {...breakProps} />
        <SetTimer {...shortSessionProps} />
        <SetTimer {...longSessionProps} />
      </div>
      <div className="clock-container">
        <h1 id="timer-label">{currentTimer}</h1>
        <span id="time-left">{convertToTime(clockCount)}</span>
        <div className="flex">
          <button id="start_stop" onClick={handlePlayPause}>
            {isPlaying ? <BsPauseFill /> : <BsPlayFill />}
          </button>
          <button id="reset" onClick={handleReset}>
            <BiReset />
          </button>
        </div>
      </div>
      <audio
        id="beep"
        preload="auto"
        ref={audioBeep}
        src="./sounds/BeepSound.wav"
      />
    </div>
  );
};

interface SetTimerProps {
  id: string;
  title: string;
  count: number;
  handleDecrease: () => void;
  handleIncrease: () => void;
}

const SetTimer = ({
  id,
  title,
  count,
  handleDecrease,
  handleIncrease,
}: SetTimerProps) => (
  <div className="timer-container">
    <h2 id={`${id}-label`}>{title}</h2>
    <div className="flex actions-wrapper">
      <button onClick={handleDecrease} id={`${id}-decrement`}>
        <AiOutlineMinus />
      </button>
      <span id={`${id}-length`}>{count}</span>
      <button onClick={handleIncrease} id={`${id}-increment`}>
        <AiOutlinePlus />
      </button>
    </div>
  </div>
);
