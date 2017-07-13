using HolidayManagement.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HolidayManagement.Models
{
    public class DashboardViewModel
    {
        public List<UserDetails> Users { get; set; }

        public List<Team> Teams { get; set; }
    }
}