function UserModel(data) {
    this.firstName = null;

    if (data != null) {
        this.firstName = data.FirstName;
        this.lastName = data.LastName;
        this.email = data.Email;
        this.hireDate = data.HireDate;
        this.maxDays = data.maxDays;

    }
}