/// <reference path="CalendarModel.js" />
function DayModel(data) {
    this.day = ko.observable(0);
    this.description = ko.observable("");
    this.month = ko.observable("");
    this.name = null;
    this.isFreeDay = null;

    if (data != null) {
        this.description(data.Description);
        this.month(data.Month);
        this.day(data.Day);
        this.name = data.Name;
        this.isFreeDay = data.IsFreeDay;

    }
}