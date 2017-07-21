using HolidayManagement.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HolidayManagement.Repository
{
    public class UserDetailsRepository : BaseRepository<UserDetails>, IUserDetailsRepository
    {
        public UserDetails GetUserDetailsById(int userDetailsId)
        {
            return DbContext.UserDetails.FirstOrDefault(x => x.ID == userDetailsId);
        }

        public List<UserDetails> GetUsers()
        {
            return DbContext.UserDetails.ToList();
        }
        
        public bool EditUserDetail(UserDetails model)
        {
            try
            {
                var user = DbContext.UserDetails.FirstOrDefault(x => x.ID == model.ID);

                if (user != null)
                {
                    var existing = DbContext.UserDetails.FirstOrDefault(x => x.AspUser.Email == model.AspUser.Email);

                    if (existing == null || existing.ID == model.ID)
                        user.AspUser.Email = model.AspUser.Email;
                    else
                        return false;

                    user.FirstName = model.FirstName;
                    user.LastName = model.LastName;
                    user.HireDate = user.HireDate;
                    user.MaxDays = model.MaxDays;                   


                    DbContext.SaveChanges();

                }
            }
            catch (Exception ex)
            {
                var msg = ex.Message;
                return false;
            }

            return true;
        }

    }
}
