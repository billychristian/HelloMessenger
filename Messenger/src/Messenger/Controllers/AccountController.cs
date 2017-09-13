using MailKit.Net.Smtp;
using Messenger.Constant;
using Messenger.Helper;
using Messenger.Models;
using Messenger.Models.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Messenger.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly UserContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;

        public AccountController(UserContext context, IPasswordHasher<User> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<User> Get()
        {
            var users = _context.User;
            return users;
        }

        // GET api/values/5
        [Route("GetUser")]
        [HttpGet("{id}", Name = "GetUser")]
        public User Get(Guid id)
        {
            if (String.IsNullOrEmpty(id.ToString())) throw new Exception("User not found!");

            var user = _context.User.Where(x => x.Id == id).FirstOrDefault();
            if(user == null)
            {
                throw new Exception("User not found!");
            }

            return user;
        }

        [Route("ActivateUserByUserCode")]
        [HttpPut("{activationCode}", Name = "ActivateUserByUserCode")]
        public IActionResult Put(string activationCode)
        {
            if (String.IsNullOrEmpty(activationCode)) return BadRequest();

            var user = _context.User.Where(x => x.UserName == Encryption.DecryptString(activationCode, AppSettings.Key)).FirstOrDefault();

            if (user == null) throw new Exception("Invalid activation link");

            user.Active = true;
            _context.User.Update(user);
            _context.SaveChanges();

            return CreatedAtRoute("GetUser", new { id = user.Id }, user);
        }

        [Authorize]
        [Route("GetByUsername")]
        [HttpGet("{username}", Name = "GetByUsername")]
        public IActionResult GetByUserName(string username)
        {
            if (String.IsNullOrEmpty(username)) return BadRequest();

            var user = _context.User.Where(x => x.UserName == username).FirstOrDefault();

            if (user == null) throw new Exception("User not found");

            return CreatedAtRoute("GetUser", new { id = user.Id }, user);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]User user)
        {
            if(user == null)
            {
                return BadRequest();
            }

            var existingUser = _context.User.FirstOrDefault(x => x.UserName == user.UserName);
            if(existingUser != null)
            {
                throw new Exception("Username is already exists");
            }

            user.Password = _passwordHasher.HashPassword(user, user.Password);
            user.CreatedAt = DateTime.Now;

            _context.User.Add(user);
            _context.SaveChanges();
            
            SendEmailActivation(user);

            return CreatedAtRoute("GetUser", new { id = user.Id }, user);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        #region private method

        private void SendEmailActivation(User user)
        {
            try
            {
                var userCode = Encryption.EncryptString(user.UserName, AppSettings.Key);
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("Admin", "billy.christian@mitrais.com"));
                message.To.Add(new MailboxAddress(user.FirstName + " " + user.LastName, user.Email));
                message.Subject = "Hello Messenger - Activation Code";
                var bodyBuilder = new BodyBuilder();
                bodyBuilder.HtmlBody = @"Hi "+ user.FirstName + " " + user.LastName + ",<br><br>";
                bodyBuilder.HtmlBody += @"Thank you for joining us. Please follow this <a href='"+AppSettings.HostAddress+ "activate-account/"+ userCode + "'>link</a> to activate your account.<br><br>";
                bodyBuilder.HtmlBody += @"Best regards,<br><br>";
                bodyBuilder.HtmlBody += @"Hello Messenger";
                message.Body = bodyBuilder.ToMessageBody();

                using (var client = new SmtpClient())
                {

                    client.Connect("exchange.mitrais.com", 465, false);
                    client.Authenticate(AppSettings.Email, Encryption.DecryptString(AppSettings.EmailPassword, AppSettings.Key));
                    client.Send(message);
                    client.Disconnect(true);
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        #endregion
    }
}
