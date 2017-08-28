using AuthServer.Models;
using System;

namespace AuthServer.Interface
{
    public interface IAuthRepository
    {
        User GetUserById(Guid id);
        User GetUserByUsername(string username);
        bool ValidatePassword(string username, string plainTextPassword);
    }
}
