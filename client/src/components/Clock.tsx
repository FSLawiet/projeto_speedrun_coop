import React, { useEffect, useState, useRef } from "react";
import "./Clock.css";

export interface ClockProps {}

export const Clock = ({}: ClockProps) => {
  const [ampm, setAmpm] = useState<string>(
    new Date().getHours() < 12 ? "AM" : "PM"
  );
  const [hours, setHours] = useState<number>(
    new Date().getHours() > 12
      ? new Date().getHours() - 12
      : new Date().getHours()
  );
  const [minutes, setMinutes] = useState<number>(new Date().getMinutes());
  const [seconds, setSeconds] = useState<number>(new Date().getSeconds());

  const hoursDisplay = useRef<SVGCircleElement>(null);
  const hr_dot = useRef<HTMLDivElement>(null);
  const minutesDisplay = useRef<SVGCircleElement>(null);
  const min_dot = useRef<HTMLDivElement>(null);
  const secondsDisplay = useRef<SVGCircleElement>(null);
  const sec_dot = useRef<HTMLDivElement>(null);

  if (hoursDisplay.current && hr_dot.current) {
    hoursDisplay.current.style.strokeDashoffset = (
      126 -
      (126 * hours) / 12
    ).toString();
    hr_dot.current.style.transform = `rotate(${hours * 30}deg)`;
  }
  if (minutesDisplay.current && min_dot.current) {
    minutesDisplay.current.style.strokeDashoffset = (
      126 -
      (126 * minutes) / 60
    ).toString();
    min_dot.current.style.transform = `rotate(${minutes * 6}deg)`;
  }
  if (secondsDisplay.current && sec_dot.current) {
    secondsDisplay.current.style.strokeDashoffset = (
      126 -
      (126 * seconds) / 60
    ).toString();
    sec_dot.current.style.transform = `rotate(${seconds * 6}deg)`;
  }

  let loop: string | number | NodeJS.Timeout | undefined = undefined;

  useEffect(() => {
    loop = setInterval(() => {
      setAmpm(new Date().getHours() < 12 ? "AM" : "PM");
      setHours(
        new Date().getHours() > 12
          ? new Date().getHours() - 12
          : new Date().getHours()
      );
      if (hoursDisplay.current && hr_dot.current) {
        hoursDisplay.current.style.strokeDashoffset = (
          126 -
          (126 * hours) / 12
        ).toString();
        hr_dot.current.style.transform = `rotate(${hours * 30}deg)`;
      }
      setMinutes(new Date().getMinutes());
      if (minutesDisplay.current && min_dot.current) {
        minutesDisplay.current.style.strokeDashoffset = (
          126 -
          (126 * minutes) / 60
        ).toString();
        min_dot.current.style.transform = `rotate(${minutes * 6}deg)`;
      }
      setSeconds(new Date().getSeconds());
      if (secondsDisplay.current && sec_dot.current) {
        secondsDisplay.current.style.strokeDashoffset = (
          126 -
          (126 * seconds) / 60
        ).toString();
        sec_dot.current.style.transform = `rotate(${seconds * 6}deg)`;
      }
    }, 1000);
  }, []);

  const convertToTime = (time: number): string => {
    const convertedTime = time < 10 ? "0" + time : time.toString();
    return convertedTime;
  };

  return (
    <div id="time">
      <div
        className="circle"
        style={{ "--clr": "#ff2972" } as React.CSSProperties}
      >
        <div className="dots" ref={hr_dot}></div>
        <svg>
          <circle cx={25} cy={25} r={20}></circle>
          <circle cx={25} cy={25} r={20} ref={hoursDisplay}></circle>
        </svg>
        <div id="hours">{convertToTime(hours)}</div>
      </div>
      <div
        className="circle"
        style={{ "--clr": "#fee800" } as React.CSSProperties}
      >
        <div className="dots" ref={min_dot}></div>
        <svg>
          <circle cx={25} cy={25} r={20}></circle>
          <circle cx={25} cy={25} r={20} ref={minutesDisplay}></circle>
        </svg>
        <div id="minutes">{convertToTime(minutes)}</div>
      </div>
      <div
        className="circle"
        style={{ "--clr": "#04fc43" } as React.CSSProperties}
      >
        <div className="dots" ref={sec_dot}></div>
        <svg>
          <circle cx={25} cy={25} r={20}></circle>
          <circle cx={25} cy={25} r={20} ref={secondsDisplay}></circle>
        </svg>
        <div id="seconds">{convertToTime(seconds)}</div>
      </div>
      <div className="ap">
        <div id="ampm">{ampm}</div>
      </div>
    </div>
  );
};
