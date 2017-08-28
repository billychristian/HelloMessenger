using MailKit.Net.Smtp;
using Messenger.Helper;
using Messenger.Models;
using Messenger.Models.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
        private static readonly string _key = "E546C8DF278CD5931069B522E695D4F2";

        public AccountController(UserContext context, IPasswordHasher<User> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            var user = new User
            {
                FirstName = "billy",
                LastName = "Christian",
                Email = "billy.christian36@gmail.com",
                UserName = "test"
            };
            SendEmailActivation(user);
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}", Name = "GetUser")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpGet("{code}", Name = "GetUserByUserCode")]
        public IActionResult Get(string code)
        {
            var user = _context.User.Where(x => x.UserName == Encryption.DecryptString(code, _key)).FirstOrDefault();
            if (user == null)
            {
                return BadRequest();
            }

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

            //_context.User.Add(user);
            //_context.SaveChanges();


            SendEmailActivation(user);

            return CreatedAtRoute("GetUser", new { id = user.Id }, user);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        [HttpPut("{activation}", Name = "ActivateUser")]
        public IActionResult Put(string activation)
        {
            var user = _context.User.Where(x => x.UserName == Encryption.DecryptString(activation, _key)).FirstOrDefault();
            if(user == null)
            {
                return BadRequest();
            }

            user.Active = true;
            _context.User.Update(user);
            _context.SaveChanges();

            return CreatedAtRoute("GetUser", new { id = user.Id }, user);
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
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("Admin", "admin@hellomessenger.com"));
                message.To.Add(new MailboxAddress(user.FirstName + " " + user.LastName, user.Email));
                message.Subject = "Hello Messenger - Activation Code";
                var bodyBuilder = new BodyBuilder();
                bodyBuilder.HtmlBody = @"Thank you for joining us. Please follow this <a href=''>link</a> to activate your account. ";
                bodyBuilder.HtmlBody += @"<br>code : " + Encryption.EncryptString(user.UserName, _key); // TODO: delete this later
                message.Body = bodyBuilder.ToMessageBody();

                using (var client = new SmtpClient())
                {

                    client.Connect("smtp.gmail.com", 587, false);
                    client.Authenticate("billy.dev36@gmail.com", "Testdev1234");
                    // Note: since we don't have an OAuth2 token, disable 	// the XOAUTH2 authentication mechanism.     client.Authenticate("anuraj.p@example.com", "password");
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
