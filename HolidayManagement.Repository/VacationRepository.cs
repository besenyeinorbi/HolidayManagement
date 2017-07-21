using HolidayManagement.Repository.Interfaces;
using HolidayManagement.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HolidayManagement.Repository
{
    public class VacationRepository : BaseRepository<Vacation>, IVacationRepository
    {
        public Vacation GetVacationById(int vacationId)
        {
            return DbContext.Vacations.FirstOrDefault(x => x.ID == vacationId);
        }

        public List<Vacation> GetVacations()
        {
            return ClearList(DbContext.Vacations.ToList());
        }
        public List<Vacation> GetVacations(int year, int month)
        {
            var firstDate = new DateTime(year, month, 1);
            var lastDate = firstDate.AddMonths(1);

            var vacations = DbContext.Vacations.Where(x => DateTime.Compare(x.StartDate, firstDate) <= 0 || DateTime.Compare(x.EndDate, lastDate) > 0).ToList();

            return ClearList(vacations);
        }

        private List<Vacation> ClearList (List<Vacation> vacations)
        {
            if (vacations != null)
            {
                foreach (var vacation in vacations)
                    vacation.State.Vacations = null;
            }

            return vacations;
        }
    }
}
