function VacationModel(data) {
    var _self = this;

    this.startDate = null;
    this.endDate = null;


    if (data != null) {
        this.startDate = data.StartDate;
        this.endDate = data.Enddate;
    }
}