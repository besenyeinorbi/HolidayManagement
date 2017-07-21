using HolidayManagement.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HolidayManagement.Models
{
    public class MonthDayViewModel
    {
        public int Day { get; set; }
        public string Name { get; set; }
        public bool IsFreeDay { get; set; }
        public string Description { get; set; }
        public string Month { get; set; }
        public List<Vacation> Vacations { get; set; }

        public MonthDayViewModel()
        {
            Vacations = new List<Vacation>();
        }

    }
}