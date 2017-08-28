using AuthServer.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthServer.Models;
using Microsoft.AspNetCore.Identity;

namespace AuthServer.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private ApplicationDbContext db;
        private readonly IPasswordHasher<User> _passwordHasher;

        public AuthRepository(ApplicationDbContext context, IPasswordHasher<User> passwordHasher)
        {
            db = context;
            _passwordHasher = passwordHasher;
        }

        public User GetUserById(Guid id)
        {
            var user = db.User.Where(u => u.Id == id).FirstOrDefault();
            return user;
        }

        public User GetUserByUsername(string username)
        {
            var user = db.User.Where(u => String.Equals(u.UserName, username)).FirstOrDefault();
            return user;
        }

        public bool ValidatePassword(string username, string plainTextPassword)
        {
            var user = db.User.Where(u => String.Equals(u.UserName, username)).FirstOrDefault();
            if (user == null) return false;
            var result = _passwordHasher.VerifyHashedPassword(user, user.Password, plainTextPassword);
            switch (result)
            {
                case PasswordVerificationResult.Success:
                    return true;
                case PasswordVerificationResult.Failed:
                    return false;
                default:
                    return false;
            }
        }
    }
}
