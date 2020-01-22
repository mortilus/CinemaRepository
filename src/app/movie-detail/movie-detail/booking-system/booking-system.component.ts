import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-booking-system',
  templateUrl: './booking-system.component.html',
  styleUrls: ['./booking-system.component.scss']
})
export class BookingSystemComponent implements OnInit {
  @Input() todayTimes: string[] = [];
  @Input() tomorrowTimes: string[] = [];
  @Output() selectedTime = new EventEmitter<{ date: string, time: string }>();

  public todayList: { selected: boolean, time: string }[] = [];
  public tomorrowList: { selected: boolean, time: string }[] = [];

  constructor() { }

  ngOnInit() {
    this.todayTimes.map(time => this.todayList.push({ selected: false, time: time }));
    this.tomorrowTimes.map(time => this.tomorrowList.push({ selected: false, time: time }));
  }

  public select(today: boolean, time: { selected: boolean, time: string }) {
    if (today) {
      this.tomorrowList.map(item => item.selected = false);
      const i = this.todayList.indexOf(time);
      this.todayList.map((t, index) => {
        if (index === i) {
          t.selected = true;
        } else { t.selected = false; }
      });
    } else {
      this.todayList.map(item => item.selected = false);
      const i = this.tomorrowList.indexOf(time);
      this.tomorrowList.map((t, index) => {
        if (index === i) {
          t.selected = true;
        } else { t.selected = false; }
      });
    }
  }

  public timeSelected(): boolean {
    var selected: boolean = false;
    if ((this.todayList.filter(t => t.selected === true).length > 0) || (this.tomorrowList.filter(t => t.selected === true).length > 0)) {
      selected = true;
    }
    return selected;
  }

  public buyTicket() {
    var ticketTime: { date: string, time: string } = null;

    const todayListSelected = this.todayList.filter(t => t.selected === true);
    const tomorrowListSelected = this.tomorrowList.filter(t => t.selected === true);
    if (todayListSelected.length > 0) {
      ticketTime = { date: 'today', time: todayListSelected[0].time };
    } else if (tomorrowListSelected.length > 0) {
      ticketTime = { date: 'tommorow', time: tomorrowListSelected[0].time };
    }

    if(ticketTime)
      this.selectedTime.emit(ticketTime);
  }
}
