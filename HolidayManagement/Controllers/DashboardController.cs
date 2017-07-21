using HolidayManagement.Models;
using HolidayManagement.Repository;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HolidayManagement.Controllers
{
    [Authorize]
    public class DashboardController : Controller
    {
        public UserDetailsRepository userDetailsRepo = new UserDetailsRepository();
        public TeamRepository teamRepo = new TeamRepository();
        public BankHolidayRepository getBankHoliday = new BankHolidayRepository();
        public VacationRepository vacRep = new VacationRepository();

        // GET: Dashboard
        public ActionResult Index()
        {
            DashboardViewModel vM = new DashboardViewModel();
            vM.Users = userDetailsRepo.GetUsers();
            vM.Teams = teamRepo.GetTeams();
            CalendarViewModel calendar = new CalendarViewModel();

            DateTimeFormatInfo mfi = new DateTimeFormatInfo();
            calendar.Month = mfi.GetMonthName(DateTime.Now.Month);
            calendar.MonthDays = GetMonthDays(DateTime.Now.Year, DateTime.Now.Month);

            vM.Calendar = calendar;

            return View(vM);
        }
        public ActionResult Users()
        {
            return View("Users");
        }

        [HttpGet]
        public ActionResult GetMonth(int month, int year)
        {
            DateTimeFormatInfo mfi = new DateTimeFormatInfo();
            CalendarViewModel calendar = new CalendarViewModel()
            {
                MonthDays = GetMonthDays(year, month),
                Month = mfi.GetMonthName(month)

            };

            return Json(new { calendar = calendar }, JsonRequestBehavior.AllowGet);
        }

        private List<MonthDayViewModel> GetMonthDays(int year, int month)
        {
            List<MonthDayViewModel> days = new List<MonthDayViewModel>();

            var bankHolidays = getBankHoliday.GetBankHolidays(); ;

            DateTime now = DateTime.Now;

            int countOfDays = DateTime.DaysInMonth(year, month);

            var holidays = vacRep.GetVacations();

            for (int i = 1; i <= countOfDays; i++)
            {
                DateTime date = new DateTime(year, month, i);
                MonthDayViewModel day = new MonthDayViewModel();
                day.Day = i;
                day.Name = date.DayOfWeek.ToString();

                var bH = bankHolidays.FirstOrDefault(x => x.Day == i && x.Month == month);

                day.IsFreeDay = date.DayOfWeek == DayOfWeek.Saturday || date.DayOfWeek == DayOfWeek.Sunday || bH != null;

                day.Vacations = holidays.Where(x => DateTime.Compare(x.StartDate, date) <= 0 && DateTime.Compare(x.EndDate, date) >= 0).ToList();
                day.Description = date.ToString("MMMM");
                DateTimeFormatInfo mfi = new DateTimeFormatInfo();
                day.Month = mfi.GetMonthName(month).ToString();

                days.Add(day);

            }

            return days;
        }

        [HttpPost]
        public ActionResult AddVacation(string userID, string fromDate, string toDate)
        {
            DateTime fdate = DateTime.Parse(fromDate);
            DateTime tdate = DateTime.Parse(toDate);

            return Json(new { }, JsonRequestBehavior.DenyGet);
        }
    }    
}