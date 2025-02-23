import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="calendar-container">
      <div class="calendar-header">
        <button (click)="previousMonth()">&lt;</button>
        <div class="month-year">
          {{ currentDate | date:'MMMM yyyy' }}
        </div>
        <button (click)="nextMonth()">&gt;</button>
      </div>

      <div class="weekdays">
        <div *ngFor="let day of weekDays" class="weekday">{{ day }}</div>
      </div>

      <div class="calendar-grid">
        <div *ngFor="let day of calendarDays" 
             class="day" 
             [class.other-month]="!day.isCurrentMonth"
             [class.today]="day.isToday"
             [class.selected]="day.isSelected"
             (click)="selectDate(day)">
          {{ day.date }}
        </div>
      </div>

      <div class="selected-date" *ngIf="selectedDate">
        Selected: {{ selectedDate | date:'mediumDate' }}
      </div>
    </div>
  `,
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  @Input() set date(value: Date) {
    this.currentDate = new Date(value);
    this.generateCalendar();
  }

  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  currentDate = new Date();
  selectedDate?: Date;
  calendarDays: CalendarDay[] = [];

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    const firstDay = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );
    const lastDay = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    );

    const startingDayIndex = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    this.calendarDays = [];

    // Previous month days
    const prevMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = startingDayIndex - 1; i >= 0; i--) {
      this.calendarDays.push({
        date: prevMonthDays - i,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false
      });
    }

    // Current month days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), i);
      this.calendarDays.push({
        date: i,
        isCurrentMonth: true,
        isToday: this.isSameDay(date, today),
        isSelected: this.selectedDate ? this.isSameDay(date, this.selectedDate) : false
      });
    }

    // Next month days
    const remainingDays = 42 - this.calendarDays.length; // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      this.calendarDays.push({
        date: i,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false
      });
    }
  }

  previousMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      1
    );
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      1
    );
    this.generateCalendar();
  }

  selectDate(day: CalendarDay) {
    if (!day.isCurrentMonth) return;

    this.selectedDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      day.date
    );
    this.generateCalendar();
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  }
}