function DashboardModel() {
    var _self = this;
    this.message = null;
    this.teams = [];

    this.users = ko.observable([]);
    this.manageUser = new UserModel();

    this.initialize = function (data) {
        _self.message = data.Message;
        var users = _.map(data.Users, function (user) {
            return new UserModel(user);
        });

        _self.users(users);

        _self.teams = _.map(data.Teams, function (team) {
            return new TeamModel(team);
        });

    };

    this.createUser = function (data) {
        $.ajax({
            url: "Account/CreateUser",
            type: "POST",
            data: {
                firstName: _self.manageUser.FirstName(),
                lastName: _self.manageUser.LastName(),
                teamId: _self.manageUser.TeamId(),
            },
            succes: function (data) {
                alert("szevasz")
            }
        }
        )
    };

}

function InitializeDashboardModel(data) {
    DashboardModel.instance = new DashboardModel();

    DashboardModel.instance.initialize(data);

    ko.applyBindings(DashboardModel.instance);
}

