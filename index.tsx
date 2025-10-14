import {ActionContext, type Effect} from "@alfons-app/pdk";
import {useContext, useEffect, useRef, memo} from "react";
import {Button} from 'react-native';
import type {Props} from "./editor";

const UPDATE_INTERVAL_MS = 100;

const TimerEffect: Effect<Props> = memo((props) => {
    const {getAction} = useContext(ActionContext);

    // timers ref
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const displayTimerRef = useRef<NodeJS.Timeout | null>(null);

    const isRunning = useRef(true);
    const startTime = useRef<number>(0);
    const remainingTime = useRef<number>(0);

    // interval for timer
    const timeoutValue = useRef<number>(0);

    const updateTimeoutValue = () => {
        timeoutValue.current = props.unit === 'seconds' ? props.interval * 1000 : props.interval;
    };

    const clearAllTimeout = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }
        if (displayTimerRef.current) {
            clearTimeout(displayTimerRef.current);
        }

        isRunning.current = false;
    }

    /**
     * Sends remaining time updates to bound timeState action.
     */
    const sendTimeUpdates = () => {

        if (!isRunning.current || !props.timeState) {
            return;
        }

        const remaining = Math.max(0, remainingTime.current - (Date.now() - startTime.current));

        try {
            const timeStateAction = getAction(props.timeState.__$ref);
            if (timeStateAction) {
                timeStateAction({
                    target: {value: remaining},
                    type: 'timeUpdateMs'
                } as any).then();
            }
        } catch (error) {
            console.error('Error calling timeState action:', error);
        }

        if (remaining > 0) {
            if (displayTimerRef.current) {
                clearTimeout(displayTimerRef.current);
            }
            displayTimerRef.current = setTimeout(sendTimeUpdates, UPDATE_INTERVAL_MS);
        }

    };

    /**
     * Resets timer with specified or default timeout value
     * @param customTimeout - optional custom timeout value, defaults to timeoutValue.current
     */
    const resetTimer = (customTimeout?: number) => {
        clearAllTimeout();

        const timeoutToUse = customTimeout ?? timeoutValue.current;
        remainingTime.current = timeoutToUse;
        startTime.current = Date.now();

        timerRef.current = setTimeout(onTimerTimeout, Math.max(0, timeoutToUse));
        isRunning.current = true;

        sendTimeUpdates();
    };

    /**
     * Toggles the timer between running and paused states.
     */
    const toggleTimer = () => {
        if (isRunning.current) {
            // Pause: calculate remaining time
            clearAllTimeout();
            remainingTime.current = remainingTime.current - (Date.now() - startTime.current);
        } else if (remainingTime.current > 0) {
            // Resume: use calculated remaining time
            resetTimer(remainingTime.current);
        }
    }

    /**
     * This function is triggered when the timer completes its interval.
     */
    const onTimerTimeout = () => {
        try {
            getAction(props.onInterval?.__$ref)?.();
        } catch (error) {
            console.error('Error calling onInterval action:', error);
        }

        if (props.repeat) {
            resetTimer();
        }
    }

    // init
    useEffect(() => {
        updateTimeoutValue();
        resetTimer();

        return () => {
            clearAllTimeout();
        };
    }, []);

    useEffect(() => {
        updateTimeoutValue();
        // Only reset if timer is currently running
        if (isRunning.current) {
            resetTimer();
        }
    }, [props.interval, props.unit, props.repeat]);

    return (
        <div style={{display: 'flex', flexDirection: 'row', gap: 10}}>
            <Button
                title={props.titleBtnReset}
                onPress={() => resetTimer()}
            />
            <Button
                title={props.titleBtnToggle}
                onPress={toggleTimer}
            />
        </div>
    );
});


export default TimerEffect;