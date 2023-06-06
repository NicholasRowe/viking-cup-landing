import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Timer = () => {

    const minuteSeconds = 60;
    const hourSeconds = 3600;
    const daySeconds = 86400;

    const timerProps = {
        isPlaying: true,
        strokeWidth: 6
    };

    const renderTime = (dimension, time) => {
        return (
        <div className="time-wrapper">
            <div className="time">{time}</div>
            <div>{dimension}</div>
        </div>
        );
    };

    const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
    const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
    const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
    const getTimeDays = (time) => (time / daySeconds) | 0;

    let distance = new Date('03/29/2024');
    distance = Date.parse(distance) / 1000;
    const startTime = Date.now() / 1000; // use UNIX timestamp in seconds
    const endTime = distance - startTime; // use UNIX timestamp in seconds

    console.log(distance);

    const remainingTime = endTime;
    const days = Math.ceil(remainingTime / daySeconds);
    const daysDuration = days * daySeconds;


    return (
     <div className="timer-container">
        <CountdownCircleTimer
            {...timerProps}
            colors="#f9de1e"
            className="timer-circle"
            duration={daysDuration}
            initialRemainingTime={remainingTime}
        >
            {({ elapsedTime, color }) => (
            <span style={{ color }}>
                {renderTime("days", getTimeDays(daysDuration - elapsedTime))}
            </span>
            )}
        </CountdownCircleTimer>
        <CountdownCircleTimer
            {...timerProps}
            colors="#f9de1e"
            className="timer-circle"
            duration={daySeconds}
            initialRemainingTime={remainingTime % daySeconds}
            onComplete={(totalElapsedTime) => ({
            shouldRepeat: remainingTime - totalElapsedTime > hourSeconds
            })}
        >
            {({ elapsedTime, color }) => (
            <span style={{ color }}>
                {renderTime("hours", getTimeHours(daySeconds - elapsedTime))}
            </span>
            )}
        </CountdownCircleTimer>
        <CountdownCircleTimer
            {...timerProps}
            colors="#f9de1e"
            className="timer-circle"
            duration={hourSeconds}
            initialRemainingTime={remainingTime % hourSeconds}
            onComplete={(totalElapsedTime) => ({
            shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds
            })}
        >
            {({ elapsedTime, color }) => (
            <span style={{ color }}>
                {renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))}
            </span>
            )}
        </CountdownCircleTimer>

        <CountdownCircleTimer
            {...timerProps}
                colors="#f9de1e"
                className="timer-circle"
                duration={minuteSeconds}
                initialRemainingTime={remainingTime % minuteSeconds}
                onComplete={(totalElapsedTime) => ({
                shouldRepeat: remainingTime - totalElapsedTime > 0
            })}
        >
            {({ elapsedTime, color }) => (
                <span style={{ color }}>
                    {renderTime("seconds", getTimeSeconds(elapsedTime))}
                </span>
            )}
        </CountdownCircleTimer>
    </div>
  )
}

export default Timer