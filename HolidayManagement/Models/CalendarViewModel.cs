using HolidayManagement.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HolidayManagement.Models
{
    public class CalendarViewModel
    {

        public List<BankHoliday> BankHoliday { get; set; }

        public List<Vacation> Vacations { get; set; }

        public List<MonthDayViewModel> MonthDays { get; set; }

        public string Month { get; set; }

        public CalendarViewModel()
        {
            MonthDays = new List<MonthDayViewModel>();
        }

        
    }
}