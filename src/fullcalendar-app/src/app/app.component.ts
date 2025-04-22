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

  handleCustomButtonClick() {
    alert('Add Event button clicked!');
    // Optional: logic to open a modal or programmatically add an event
  }
  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends;
  }
}
