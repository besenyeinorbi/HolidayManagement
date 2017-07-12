function DashboardModel() {
    var _self = this;
    this.message = null;

    this.users = ko.observable([]);

    this.initialize = function (data) {
        _self.message = data.Message;
        var users = _.map(data.Users, function (user) {
            return new UserModel(user);
        });

        _self.users(users);
    }
}

function InitializeDashboardModel(data) {
    DashboardModel.instance = new DashboardModel();

    DashboardModel.instance.initialize(data);

    ko.applyBindings(DashboardModel.instance);
}
