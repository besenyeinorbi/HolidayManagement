function TeamModel(data) {
    this.Id = ko.observable(0);
    this.description = null;

    if (data != null) {
        this.description = data.Description;
        this.Id = data.Id;
        

    }
}