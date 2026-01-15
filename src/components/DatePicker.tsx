import { useState, useEffect } from 'react';

interface DatePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (date: string) => void;
  selectedDate?: string;
}

function DatePicker({ isOpen, onClose, onSelect, selectedDate }: DatePickerProps) {
  const getInitialDate = () => {
    if (!selectedDate || selectedDate === '') {
      return new Date();
    }
    const parsedDate = new Date(selectedDate);
    return isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
  };

  const [currentDate, setCurrentDate] = useState(getInitialDate());
  const [view, setView] = useState<'day' | 'month' | 'year'>('day');
  const [isClosing, setIsClosing] = useState(false);

  // Reset isClosing when the bottom sheet opens
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const weekDays = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleSelectDay = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const formatted = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    setIsClosing(true);
    setTimeout(() => {
      onSelect(formatted);
      onClose();
    }, 200);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 200);
  };

  const handleSelectToday = () => {
    const today = new Date();
    const formatted = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    setIsClosing(true);
    setTimeout(() => {
      onSelect(formatted);
      onClose();
    }, 200);
  };

  const handleApplyDate = () => {
    const formatted = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
    setIsClosing(true);
    setTimeout(() => {
      onSelect(formatted);
      onClose();
    }, 200);
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Ajustar firstDay para que lunes sea 0
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

    // Días del mes anterior
    const prevMonthDays = getDaysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    for (let i = adjustedFirstDay - 1; i >= 0; i--) {
      days.push(
        <div
          key={`prev-${i}`}
          className="basis-0 flex gap-2 grow h-10 items-center justify-center px-1 py-1"
        >
          <div className="flex flex-col gap-2.5 items-center justify-center relative rounded-full shrink-0 w-9 h-9">
            <p className="font-normal leading-5 text-sm text-slate-300 text-center whitespace-pre">
              {prevMonthDays - i}
            </p>
          </div>
        </div>
      );
    }

    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday =
        i === new Date().getDate() &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear();

      const isSelected = (() => {
        if (!selectedDate || selectedDate === '') return false;
        const selectedDateObj = new Date(selectedDate);
        if (isNaN(selectedDateObj.getTime())) return false;
        return (
          i === selectedDateObj.getDate() &&
          currentDate.getMonth() === selectedDateObj.getMonth() &&
          currentDate.getFullYear() === selectedDateObj.getFullYear()
        );
      })();

      days.push(
        <button
          key={i}
          onClick={() => handleSelectDay(i)}
          className="basis-0 flex gap-2 grow h-10 items-center justify-center px-1 py-1"
        >
          <div
            className={`flex flex-col gap-2.5 items-center justify-center relative rounded-xl w-9 h-9 ${
              isSelected || isToday
                ? 'border-2 border-[#30aba9] p-2.5'
                : ''
            }`}
          >
            <p
              className={`font-normal leading-5 text-sm text-center whitespace-pre ${
                isSelected || isToday ? 'text-[#30aba9]' : 'text-slate-700'
              }`}
            >
              {i}
            </p>
          </div>
        </button>
      );
    }

    // Días del próximo mes
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(
        <div
          key={`next-${i}`}
          className="basis-0 flex gap-2 grow h-10 items-center justify-center px-1 py-1"
        >
          <div className="flex flex-col gap-2.5 items-center justify-center relative rounded-full shrink-0 w-9 h-9">
            <p className="font-normal leading-5 text-sm text-slate-300 text-center whitespace-pre">
              {i}
            </p>
          </div>
        </div>
      );
    }

    return days;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-slate-700/60 backdrop-blur-sm z-40 ${isClosing ? 'animate-overlay-out' : 'animate-overlay-in'}`}
        onClick={handleClose}
      ></div>

      {/* Calendar Popup */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[16px] z-50 shadow-[0px_0px_0px_1px_rgba(148,163,184,0.2),0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_2px_6px_-2px_rgba(0,0,0,0.05)] flex flex-col animate-in zoom-in-90 duration-300">
        {/* Calendar Content */}
        <div className="bg-white rounded-[16px] flex flex-col gap-3 p-3 w-full">
          {/* Header */}
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-1 items-start">
              <button
                onClick={() => setView(view === 'day' ? 'month' : 'year')}
                className="flex gap-1 h-8 items-center justify-center px-4 py-1.5 rounded-lg"
              >
                <p className="font-semibold leading-5 text-sm text-slate-700 text-center whitespace-pre">
                  {view === 'day' ? months[currentDate.getMonth()] : 'Mes'}
                </p>
                <img src="/images/arrow-right.svg" alt="" className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView(view === 'day' ? 'year' : 'day')}
                className="flex gap-1 h-8 items-center justify-center px-4 py-1.5 rounded-lg"
              >
                <p className="font-semibold leading-5 text-sm text-slate-700 text-center whitespace-pre">
                  {currentDate.getFullYear()}
                </p>
                <img src="/images/arrow-right.svg" alt="" className="w-4 h-4" />
              </button>
            </div>
            {view === 'day' && (
              <div className="flex gap-0.5 items-center">
                <button
                  onClick={handlePrevMonth}
                  className="flex gap-1 items-center justify-center p-1.5 rounded-lg w-8 h-8"
                >
                  <img src="/images/arrow-left.svg" alt="" className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="flex gap-1 items-center justify-center p-1.5 rounded-lg w-8 h-8"
                >
                  <img src="/images/arrow-right.svg" alt="" className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Calendar Body */}
          {view === 'day' && (
            <div className="flex flex-col items-start w-full">
              {/* Weekday labels */}
              <div className="flex items-start w-full">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="basis-0 flex flex-col gap-2 grow h-8 items-center justify-center p-2"
                  >
                    <p className="font-normal leading-4 text-xs text-slate-500 text-center whitespace-pre">
                      {day}
                    </p>
                  </div>
                ))}
              </div>
              {/* Days grid */}
              <div className="flex flex-col items-start w-full">
                {Array.from({ length: 6 }).map((_, weekIndex) => (
                  <div key={weekIndex} className="flex items-start w-full">
                    {renderDays().slice(weekIndex * 7, (weekIndex + 1) * 7)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-400/20 bg-slate-50 flex items-center justify-between px-3 py-3 w-full rounded-b-[16px]">
          <button
            onClick={handleSelectToday}
            className="flex gap-1 h-8 items-center justify-center px-4 py-1.5 rounded-lg"
          >
            <p className="font-medium leading-5 text-sm text-[#30aba9] text-center whitespace-pre">
              Hoy
            </p>
          </button>
          <div className="flex gap-2 items-center">
            <button
              onClick={handleClose}
              className="bg-white border border-slate-300/40 flex gap-1 h-10 items-center justify-center px-5 py-2.5 rounded-[10px]"
            >
              <p className="font-medium leading-5 text-sm text-slate-900 text-center whitespace-pre">
                Cancelar
              </p>
            </button>
            <button
              onClick={handleApplyDate}
              className="bg-[#30aba9] flex gap-1 h-10 items-center justify-center px-5 py-2.5 rounded-[10px]"
            >
              <p className="font-medium leading-5 text-sm text-white text-center whitespace-pre">
                Aplicar
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DatePicker;
