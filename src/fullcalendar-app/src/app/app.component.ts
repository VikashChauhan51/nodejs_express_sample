import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions,EventInput  } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list'; 
import { FormsModule } from '@angular/forms';
import multiMonthPlugin from '@fullcalendar/multimonth'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FullCalendarModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  title = 'fullcalendar-app';

  allEvents: EventInput[] = [
    {
      title: 'Event A',
      start: '2025-04-22T10:00:00',
      end: '2025-04-22T11:30:00',
    },
    {
      title: 'Event B (Overlaps A)',
      start: '2025-04-22T10:45:00',
      end: '2025-04-22T12:00:00',
    },
    {
      title: 'Event C (Overlaps both)',
      start: '2025-04-22T10:15:00',
      end: '2025-04-22T11:00:00',
    },
    {
      title: 'Meeting',
      start: '2025-04-24T14:00:00',
      end: '2025-04-24T15:30:00',
    },
  ];

  filterStart: string = '';
  filterEnd: string = '';
  searchTerm: string = '';

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin,listPlugin,multiMonthPlugin],
    hiddenDays: [0], 
    weekends: true,
    allDaySlot: true,
    dayHeaderContent: (args) => {
      const defaultFormatter = new Intl.DateTimeFormat(navigator.language, { weekday: 'short' });
      const dayIndex = args.date.getDay();
      
      if (dayIndex === 6) { // Saturday
        return 'Waitlist';
      }
  
      // Fallback to browser's short weekday name
      return defaultFormatter.format(args.date);
    },
    initialView: 'multiMonthYear',
    multiMonthMaxColumns: 1,
    headerToolbar: {
      left: 'prev,next today addEventButton toggleWeekendButtons',
      center: 'title',
      right: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    customButtons: {
      addEventButton: {
        text: 'Add Event', // Button text
        click: this.handleCustomButtonClick.bind(this), // Button click handler
      },
      toggleWeekendButtons: {
        text: 'Toggle weekends', // Button text
        click: this.toggleWeekends.bind(this), // Button click handler
      },
    },
    editable: true,
    selectable: true,
    droppable: true,
    eventOverlap: true,
    eventMouseEnter: this.handleEventMouseEnter.bind(this),
    eventMouseLeave: this.handleEventMouseLeave.bind(this),
    events: this.allEvents,
    drop: (info) => {
      // Remove the element from list if needed
      // if (info.draggedEl.parentNode) {
      //   info.draggedEl.parentNode.removeChild(info.draggedEl);
      // }
    }
  };

  ngAfterViewInit(): void {
    const draggableEl = document.getElementById('external-events');
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
          return {
            title: eventEl.innerText.trim(),
          };
        },
      });
    }
  }

  applyFilters() {
    const filtered = this.allEvents.filter(event => {
      const eventStart = new Date(event.start as string).getTime();
      const startDate = this.filterStart ? new Date(this.filterStart).getTime() : null;
      const endDate = this.filterEnd ? new Date(this.filterEnd).getTime() : null;

      const matchDate =
        (!startDate || eventStart >= startDate) &&
        (!endDate || eventStart <= endDate);

      const matchTitle = this.searchTerm
        ? event.title?.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      return matchDate && matchTitle;
    });

    this.calendarOptions.events = filtered;
  }
  handleEventMouseEnter(arg: any): void {
    const tooltip = document.createElement('div');
    tooltip.setAttribute('id', 'event-tooltip');
    tooltip.innerHTML = `
      <strong>${arg.event.title}</strong><br/>
      ${arg.event.extendedProps.description || ''}
    `;
    tooltip.style.position = 'absolute';
    tooltip.style.top = `${arg.jsEvent.pageY + 10}px`;
    tooltip.style.left = `${arg.jsEvent.pageX + 10}px`;
    tooltip.style.background = 'rgba(0, 0, 0, 0.75)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '5px 10px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.zIndex = '1000';
    document.body.appendChild(tooltip);
  }
  
  handleEventMouseLeave(): void {
    const tooltip = document.getElementById('event-tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  }
  
  handleCustomButtonClick() {
    alert('Add Event button clicked!');
    // Optional: logic to open a modal or programmatically add an event
  }
  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends;
  }
}
