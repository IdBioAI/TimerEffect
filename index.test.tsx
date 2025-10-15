import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TimerEffect from './index';

jest.useFakeTimers();

describe('TimerEffect', () => {
  const defaultProps = {
    interval: 1000,
    unit: 'milliseconds' as const,
    repeat: false,
    onInterval: { __$ref: 'test-action' },
    titleBtnReset: 'Reset',
    titleBtnToggle: 'Toggle'
  };

  it('should render without crashing', () => {
    const { container } = render(<TimerEffect {...defaultProps} />);
    expect(container).toBeTruthy();
  });

  it('should render reset and toggle buttons', () => {
    const { container } = render(<TimerEffect {...defaultProps} />);
    const buttons = container.querySelectorAll('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent('Reset');
    expect(buttons[1]).toHaveTextContent('Toggle');
  });

  it('should start timer on mount', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    render(<TimerEffect {...defaultProps} />);

    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 1000);
    setTimeoutSpy.mockRestore();
  });

  it('should convert seconds to milliseconds', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    render(<TimerEffect {...defaultProps} interval={5} unit="seconds" />);
    
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 5000);
    setTimeoutSpy.mockRestore();
  });

  it('should execute action after 2 seconds timeout', () => {
    // Update mock to track action calls
    const mockAction = jest.fn();
    require('@alfons-app/pdk').ActionContext._currentValue = {
      getAction: jest.fn().mockReturnValue(mockAction)
    };

    render(<TimerEffect {...defaultProps} interval={2} unit="seconds" />);
    
    // Initially action should not be called
    expect(mockAction).not.toHaveBeenCalled();
    
    // debounce delay (500ms) to start timer
    jest.advanceTimersByTime(500);
    
    // Then advance timer duration (2000ms) to trigger action
    jest.advanceTimersByTime(2000);
    
    // Action should be called exactly once
    expect(mockAction).toHaveBeenCalledTimes(1);
  });
});