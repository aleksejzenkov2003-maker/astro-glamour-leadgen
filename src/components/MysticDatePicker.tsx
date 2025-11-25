import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MysticDatePickerProps {
  value: string;
  onChange: (date: string) => void;
}

const MysticDatePicker = ({ value, onChange }: MysticDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const selectedDate = value ? new Date(value) : null;

  const monthNames = [
    "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
    "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
  ];

  const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Get the day of week (0 = Sunday, 1 = Monday, etc.)
    let firstDayOfWeek = firstDay.getDay();
    // Convert to Monday = 0, Sunday = 6
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days in month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateSelect = (day: number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = new Date(year, month, day);
    const formattedDate = date.toISOString().split('T')[0];
    onChange(formattedDate);
    setIsOpen(false);
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    const formattedDate = today.toISOString().split('T')[0];
    onChange(formattedDate);
    setIsOpen(false);
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const isSelectedDate = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear()
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-16 px-4 text-lg bg-card backdrop-blur-md border-2 border-primary/40 rounded-2xl text-gold font-semibold focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all duration-300 glow-mystical flex items-center justify-between group hover:border-gold/60"
      >
        <span className={value ? "text-gold" : "text-muted-foreground"}>
          {value ? formatDisplayDate(value) : "Выберите дату рождения"}
        </span>
        <Calendar className="h-5 w-5 text-gold group-hover:scale-110 transition-transform" />
      </button>

      {/* Calendar popup */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Calendar - centered modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="relative bg-card/95 backdrop-blur-xl border-2 border-primary/40 rounded-2xl p-4 shadow-[0_0_60px_rgba(255,216,138,0.3)] glow-mystical w-full max-w-sm animate-scale-in">
              {/* Mystical glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-2xl blur-xl opacity-50 animate-pulse-mystical" />
              
              <div className="relative space-y-4">
                {/* Month/Year header */}
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-primary/20 rounded-lg transition-colors group"
                  >
                    <ChevronLeft className="h-5 w-5 text-gold group-hover:scale-110 transition-transform" />
                  </button>
                  
                  <h3 className="text-lg font-bold text-gradient-gold glow-gold">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h3>
                  
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-primary/20 rounded-lg transition-colors group"
                  >
                    <ChevronRight className="h-5 w-5 text-gold group-hover:scale-110 transition-transform" />
                  </button>
                </div>

                {/* Day names */}
                <div className="grid grid-cols-7 gap-1">
                  {dayNames.map((day) => (
                    <div
                      key={day}
                      className="text-center text-xs font-semibold text-muted-foreground py-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Days grid */}
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => (
                    <div key={index} className="aspect-square">
                      {day ? (
                        <button
                          type="button"
                          onClick={() => handleDateSelect(day)}
                          className={`
                            w-full h-full rounded-lg text-sm font-semibold
                            transition-all duration-200
                            ${
                              isSelectedDate(day)
                                ? "bg-gradient-gold text-primary scale-110 shadow-[0_0_20px_rgba(255,216,138,0.6)]"
                                : isToday(day)
                                ? "bg-primary/30 text-gold border border-gold/50"
                                : "text-foreground hover:bg-primary/20 hover:text-gold hover:scale-105"
                            }
                          `}
                        >
                          {day}
                        </button>
                      ) : (
                        <div />
                      )}
                    </div>
                  ))}
                </div>

                {/* Quick actions */}
                <div className="flex gap-2 pt-2 border-t border-primary/20">
                  <Button
                    type="button"
                    onClick={handleToday}
                    variant="ghost"
                    className="flex-1 text-sm text-gold hover:bg-primary/20 hover:text-gold"
                  >
                    Сегодня
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    variant="ghost"
                    className="flex-1 text-sm text-muted-foreground hover:bg-muted/20"
                  >
                    Закрыть
                  </Button>
                </div>

                {/* Decorative stars */}
                <div className="absolute -top-2 -right-2 text-xl animate-float">⭐</div>
                <div className="absolute -bottom-2 -left-2 text-lg animate-float" style={{animationDelay: "0.5s"}}>✨</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MysticDatePicker;
