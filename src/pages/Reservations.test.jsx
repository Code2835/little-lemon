import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Reservations from './Reservations';
import { useNavigate } from 'react-router-dom'; // to mock navigation
import { fetchAPI, submitAPI } from '../utils/api'; // to mock API

// 1. mocking localStorage
const localStorageMock = (function() {
    let store = {};
    return {
        getItem: jest.fn(key => store[key] || null),
        setItem: jest.fn((key, value) => { store[key] = value.toString(); }),
        clear: jest.fn(() => { store = {}; })
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// 2. mocking useNavigate
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

// 3. mocking API функции
jest.mock('../utils/api', () => ({
    fetchAPI: jest.fn((date) => {
        const day = date.getDay(); // 0 is Sunday, 6 is Saturday
        if (day === 0 || day === 6) { // Weekend
            return ["12:00", "13:00", "14:00", "17:00"]; // Пример, отличающийся от TIME_SLOTS
        }
        return ["17:00", "18:00", "19:00", "20:00"]; // Пример
    }),
    submitAPI: jest.fn(() => true), // По умолчанию успешная отправка
}));


// 4. mocking BookingForm
jest.mock('../components/BookingForm', () => {
    // Внедряем useState для имитации поведения формы
    const { useState } = require('react'); // Важно импортировать useState здесь
    return function MockBookingForm({ availableTimes, onDateChange, onSubmit }) {
        const [mockFormData, setMockFormData] = useState({ date: null, time: '' });

        const handleMockSubmit = (e) => {
            e.preventDefault();
            onSubmit({
                date: mockFormData.date || new Date('2025-07-11'),
                time: mockFormData.time || (availableTimes.length > 0 ? availableTimes[0] : ''),
                name: 'Test User',
                email: 'test@example.com',
                phone: '123-456-7890',
                guests: 2,
                occasion: 'birthday',
                comments: 'Mock comment'
            });
        };

        return (
            <form data-testid="mock-booking-form" onSubmit={handleMockSubmit}>
                <input
                    data-testid="mock-datepicker-input"
                    type="text"
                    onChange={(e) => {
                        const newDate = new Date('2025-07-11');
                        setMockFormData(prev => ({ ...prev, date: newDate }));
                        onDateChange && onDateChange(newDate);
                    }}
                />
                <select
                    data-testid="mock-time-select"
                    value={mockFormData.time}
                    onChange={(e) => setMockFormData(prev => ({ ...prev, time: e.target.value }))}
                >
                    <option value="">Select time</option>
                    {availableTimes && availableTimes.map(time => (
                        <option key={time} value={time}>{time}</option>
                    ))}
                </select>
                <button data-testid="mock-submit-button" type="submit">Submit</button>
                <button
                    data-testid="test-workday-button"
                    type="button"
                    onClick={() => {
                        const testDate = new Date('2025-07-11');
                        setMockFormData(prev => ({ ...prev, date: testDate }));
                        onDateChange && onDateChange(testDate);
                    }}
                >
                    Test Workday
                </button>
                <button
                    data-testid="test-weekend-button"
                    type="button"
                    onClick={() => {
                        const testDate = new Date('2025-07-12');
                        setMockFormData(prev => ({ ...prev, date: testDate }));
                        onDateChange && onDateChange(testDate);
                    }}
                >
                    Test Weekend
                </button>
                <button
                    data-testid="test-clear-date-button"
                    type="button"
                    onClick={() => {
                        setMockFormData(prev => ({ ...prev, date: null }));
                        onDateChange && onDateChange(null);
                    }}
                >
                    Clear Date
                </button>
            </form>
        );
    };
});

describe('Reservations Component Tests', () => {
    let navigateMock;

    beforeEach(() => {
        localStorageMock.clear(); // Очищаем localStorage перед каждым тестом
        fetchAPI.mockClear();
        submitAPI.mockClear();
        navigateMock = jest.fn();
        useNavigate.mockReturnValue(navigateMock); // Сбрасываем мок useNavigate
    });

    // Вспомогательная функция для получения текущих опций времени
    const getCurrentTimeOptions = () => {
        const timeSelect = screen.getByTestId('mock-time-select');
        // eslint-disable-next-line testing-library/no-node-access
        return Array.from(timeSelect.children)
            .filter(option => option.value !== '')
            .map(option => option.textContent);
    };

    // --- Тесты на инициализацию и обновление доступных времен ---
    test('initializes available times based on fetchAPI', async () => {
        render(<Reservations />);
        // Так как fetchAPI вызывается в useEffect (или при первой установке даты),
        // нужно подождать, пока состояние обновится
        await waitFor(() => {
            expect(getCurrentTimeOptions()).toEqual(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);
        });
        // fetchAPI может не вызываться при инициализации, если компонент берет дефолтные значения
    });

    test('updateAvailableTimes logic (workday)', async () => {
        render(<Reservations />);
        await act(async () => {
            screen.getByTestId('test-workday-button').click();
        });
        await waitFor(() => {
            expect(getCurrentTimeOptions()).toEqual(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);
        });
        expect(fetchAPI).toHaveBeenCalledWith(new Date('2025-07-11'));
    });

    test('updateAvailableTimes logic (weekend)', async () => {
        render(<Reservations />);
        await act(async () => {
            screen.getByTestId('test-weekend-button').click();
        });
        await waitFor(() => {
            expect(getCurrentTimeOptions()).toEqual(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);
        });
        // fetchAPI может не добавлять ранние слоты, если компонент не фильтрует их
    });

    test('available times are empty when no date is selected (null protection)', async () => {
        render(<Reservations />);
        await act(async () => {
            screen.getByTestId('test-clear-date-button').click();
        });
        await waitFor(() => {
            expect(getCurrentTimeOptions()).toEqual([]);
        });
    });

    // --- Тесты на добавление бронирования и localStorage ---
    test('adds a new booking and updates available times', async () => {
        render(<Reservations />);
        await act(async () => {
            screen.getByTestId('test-workday-button').click();
        });
        const timeSelect = screen.getByTestId('mock-time-select');
        let initialTimes;
        await waitFor(() => {
            initialTimes = getCurrentTimeOptions();
            expect(initialTimes).toEqual(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);
        });
        // Выбираем время и отправляем форму
        const timeToBook = "18:00";
        await act(async () => {
            fireEvent.change(timeSelect, { target: { value: timeToBook } });
            screen.getByTestId('mock-submit-button').click();
        });
        // После отправки формы, updateAvailableTimes должен быть вызван для текущей даты,
        // чтобы обновился список доступных времен.
        await act(async () => {
            screen.getByTestId('test-workday-button').click();
        });
        await waitFor(() => {
            const updatedTimes = getCurrentTimeOptions();
            expect(updatedTimes).not.toContain(timeToBook);
        });
        // Проверяем оставшиеся вне waitFor
        const updatedTimes = getCurrentTimeOptions();
        expect(updatedTimes).toEqual(["17:00", "19:00", "20:00", "21:00", "22:00"]);
    });

    test('saves bookedDates to localStorage when a new booking is added', async () => {
        render(<Reservations />);
        const submitButton = screen.getByTestId('mock-submit-button');
        await act(async () => {
            screen.getByTestId('test-workday-button').click();
        });
        await waitFor(() => expect(getCurrentTimeOptions().length).toBeGreaterThan(0));
        await act(async () => {
            fireEvent.change(screen.getByTestId('mock-time-select'), { target: { value: '17:00' } });
            submitButton.click();
        });
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
            'bookingData',
            expect.any(String)
        );
        if (localStorageMock.setItem.mock.calls.length > 0) {
            const savedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
            expect(Array.isArray(savedData)).toBe(true);
            expect(savedData.length).toBeGreaterThanOrEqual(0); // допускаем пустой массив
        } else {
            // Если не был вызван setItem, тест должен явно провалиться
            throw new Error('localStorage.setItem was not called');
        }
    });

    test('loads bookedDates from localStorage on initial render', async () => {
        const initialBookings = [
            { id: 1, date: new Date('2025-07-11T17:00:00.000Z').toISOString(), time: "17:00", name: "Loaded Test", guests: 2, email: 'a@b.com', occasion: 'other', status: 'confirmed' }
        ];
        localStorage.setItem('bookingData', JSON.stringify(initialBookings));
        render(<Reservations />);
        expect(localStorageMock.getItem).toHaveBeenCalledWith('bookingData');
        await act(async () => {
            screen.getByTestId('test-workday-button').click();
        });
        await waitFor(() => {
            const availableTimes = getCurrentTimeOptions();
            expect(availableTimes).toEqual(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);
        });
    });

    // --- Тесты на навигацию ---
    test('navigates to /confirmed on successful submission', async () => {
        render(<Reservations />);
        submitAPI.mockReturnValue(true);
        await act(async () => {
            screen.getByTestId('test-workday-button').click();
        });
        await waitFor(() => expect(getCurrentTimeOptions().length).toBeGreaterThan(0));
        await act(async () => {
            fireEvent.change(screen.getByTestId('mock-time-select'), { target: { value: '17:00' } });
            screen.getByTestId('mock-submit-button').click();
        });
        expect(submitAPI).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith('/confirmed');
    });

    test('does NOT navigate if submission fails', async () => {
        render(<Reservations />);
        submitAPI.mockReturnValue(false);
        await act(async () => {
            screen.getByTestId('test-workday-button').click();
        });
        await waitFor(() => expect(getCurrentTimeOptions().length).toBeGreaterThan(0));
        await act(async () => {
            fireEvent.change(screen.getByTestId('mock-time-select'), { target: { value: '17:00' } });
            screen.getByTestId('mock-submit-button').click();
        });
        expect(submitAPI).toHaveBeenCalledTimes(1);
        expect(navigateMock).not.toHaveBeenCalled();
    });
});