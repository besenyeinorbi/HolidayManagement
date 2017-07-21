function DashboardModel() {
    var _self = this;
    this.message = null;
    this.teams = [];
    this.roleList = [];
    this.days = ko.observableArray();
    this.month = ko.observable();
    this.monthName = ko.observable();
    this.year = ko.observable();
    this.selectedUserID = ko.observable();
    
    this.users = ko.observable([]);
    this.manageUser = new UserModel();
    this.errorMessage = ko.observable("");
    this.isEditMode = ko.observable(false);
    this.fromDate = ko.observable();
    this.toDate = ko.observable();

    this.initialize = function (data) {
        _self.message = data.Message;
        var users = _.map(data.Users, function (user) {
            return new UserModel(user);
        });

        _self.users(users);

        _self.teams = _.map(data.Teams, function (team) {
            return new TeamModel(team);
        });
        var days = _.map(data.Calendar.MonthDays, function (day, index) {
            return new DayModel(day);
        });
        _self.days(days);
        var currentDate = new Date();
        _self.month(currentDate.getMonth() + 1);
        _self.year(currentDate.getFullYear());

        _self.monthName(data.Calendar.Month);

    };

    this.updateManageUser = function (data) {
        _self.manageUser.id(data.id());
        _self.manageUser.firstName(data.firstName());
        _self.manageUser.lastName(data.lastName());
        _self.manageUser.email(data.email());
        _self.manageUser.hireDate(data.hireDate());
        _self.manageUser.maxDays(data.maxDays());

        _self.isEditMode(true);
    }

    //create button
    this.saveUser = function (data) {
        $.ajax({
            // url: _self.isEditMode() ? "/Account/EditUser" : "/Account/CreateUser",
            url: "/Account/CreateUser",
            type: "POST",
            data: {
                ID: _self.manageUser.id(),
                firstName: _self.manageUser.firstName(),
                lastName: _self.manageUser.lastName(),
                email: _self.manageUser.email(),
                teamId: _self.manageUser.teamId,
                AspUser: {
                    Email: _self.manageUser.email()
                }
            },
            success: function (data) {

                if (data.successed) {
                    if (!_self.isEditMode()) {
                        var users = _self.users();
                        users.push(_self.manageUser);
                        _self.users(users);
                    }
                    else {
                        var user = _.find(data.Users, function (user) {
                            return new user.ID() == _self.manageUser.id()
                        });

                        if (user != null) {
                            user.firstName(_self.manageUser.firstName());
                            user.lastName(_self.manageUser.lastName());
                            user.email(_self.manageUser.email());
                            user.hireDate(_self.manageUser.hireDate());
                            user.maxDays(_self.manageUser.maxDays());
                        }
                    }

                    $('#myModal').modal('hide');

                }
                else {
                    _self.errorMessage(data.messages);
                }
            }
        });


        //alert("Error");
        _self.isEditMode(false);
    }


    //edit the button
    this.editUser = function (data) {
        $.ajax({
            url: "/Account/EditUser",
            type: "POST",
            data: {
                ID: _self.manageUser.id(),
                FirstName: _self.manageUser.firstName(),
                LastName: _self.manageUser.lastName(),
                TeamId: _self.manageUser.teamId,
                AspUser: {
                    Email: _self.manageUser.email()
                }
            },
            success: function (data) {

                if (data.successed)
                    $('#myModal').modal('hide');
                else {
                    _self.errorMessage(data.messages);
                }
                //alert("Error");
            }
        }
        )
    };

    var setDateWithZero = function (date) {

        if (date < 10)

            date = "0" + date;

        return date;

    };

    var dateTimeReviver = function (value) {

        var match;

        if (typeof value === 'string') {

            match = /\/Date\((\d*)\)\//.exec(value);

            if (match) {

                var date = new Date(+match[1]);

                return date.getFullYear() + "-" + setDateWithZero(date.getMonth() + 1) + "-" +

                setDateWithZero(date.getDate()) +

                "T" + setDateWithZero(date.getHours()) + ":"; +

                setDateWithZero(date.getMinutes()) + ":"; +setDateWithZero(date.getSeconds()) + "." +

                date.getMilliseconds();
            }
        }

        return value;

    };

    this.previousMonth = function () {
        if (_self.month() == 1) {
            _self.month(12);
            _self.year(_self.year() - 1);
        }
        else
            _self.month(_self.month() - 1);

        $.ajax({
            url: "/Dashboard/GetMonth",
            type: "GET",
            data: {
                month: _self.month(),
                year: _self.year(),
            },
            success: function (data) {
                _self.monthName(data.calendar.Month);
                var days = _.map(data.calendar.MonthDays, function (day, index) {
                    return new DayModel(day);
                });
                _self.days(days);
            }
        })
    }

    this.nextMonth = function () {
        if (_self.month() == 12) {
            _self.month(1);
            _self.year(_self.year() + 1);
        }
        else
            _self.month(_self.month() + 1);

        $.ajax({
            url: "/Dashboard/GetMonth",
            type: "GET",
            data: {
                month: _self.month(),
                year: _self.year(),
            },
            success: function (data) {
                _self.monthName(data.calendar.Month);
                var days = _.map(data.calendar.MonthDays, function (day, index) {
                    return new DayModel(day);
                });
                _self.days(days);
            }
        })
    }

    this.addVacation = function ()
    {
        $.ajax({
            url: "/Dashboard/AddVacation",
            type: "POST",
            data: {
                userID: _self.selectedUserID(),
                fromDate: _self.fromDate(),
                toDate: _self.toDate(),
            },
            success: function (data) {
                _self.monthName(data.calendar.Month);
                var days = _.map(data.calendar.MonthDays, function (day, index) {
                    return new DayModel(day);
                });
                _self.days(days);
            }
        })
    }
}

function InitializeDashboardModel(data) {
    DashboardModel.instance = new DashboardModel();

    DashboardModel.instance.initialize(data);

    ko.applyBindings(DashboardModel.instance);
}
   