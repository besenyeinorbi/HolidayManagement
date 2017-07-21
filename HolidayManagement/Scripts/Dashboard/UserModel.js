function UserModel(data) {
    this.id = ko.observable(null);
    this.firstName = ko.observable(null);
    this.lastName = ko.observable(null);
    this.fullName = ko.observable();
    this.email = ko.observable(null);
    this.hireDate = ko.observable(null);
    this.maxDays = ko.observable(null);
    this.team = new TeamModel();
       
    if (data != null) {
        this.id(data.ID);
        this.firstName(data.FirstName);
        this.lastName(data.LastName);
        var fullName = data.FirstName + ' ' + data.LastName;
        this.fullName(fullName);
        this.email(data.AspUser.Email);
        this.hireDate(data.HireDate);
        this.maxDays(data.MaxDays);

        this.team = new TeamModel(data.Team);
    }
    
}