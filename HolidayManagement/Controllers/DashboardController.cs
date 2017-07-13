using HolidayManagement.Models;
using HolidayManagement.Repository;
using System;
using System.Collections.Generic;
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

        // GET: Dashboard
        public ActionResult Index()
        {
            DashboardViewModel vM = new DashboardViewModel();
            vM.Users = userDetailsRepo.GetUsers();
            vM.Teams = teamRepo.GetTeams();
            return View(vM);
        }

    //public ActionResult Users()
    //{
    //    return PartialView("_Users");
    //}
    //public PartialViewResult GroupManagment()
    //{
    //    return PartialView("_GroupManagment");
    //}
    //public PartialViewResult MyCalendar()
    //{
    //    return PartialView("_MyCalendar");
    //}
    //public PartialViewResult Settings()
    //{
    //    return PartialView("_Settings");
    //}
}
}