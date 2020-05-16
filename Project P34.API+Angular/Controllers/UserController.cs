using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Project_IDA.DTO.Models.Result;
using Project_P34.DataAccess;
using Project_P34.DataAccess.Entity;
using Project_P34.DTO.Models;

namespace Project_P34.API_Angular.Controllers
{
    [Route("api/usermanager")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly UserManager<User> _userManager;

        public UserController(EFContext c, UserManager<User> u)
        {
            _context = c;
            _userManager = u;

        }

        [HttpGet]
        public IEnumerable<useritemdto> getusers()
        {
            List<useritemdto> data = new List<useritemdto>();

            var datadb = _context.Users.Where(t => t.Email != "admin@gmail.com").ToList();

            foreach (var item in datadb)
            {
                var moreinfo = _context.userMoreInfos.FirstOrDefault(t => t.Id == item.Id);
                useritemdto user = new useritemdto();
                user.Email = item.Email;
                user.Id = item.Id;
                user.Phone = item.PhoneNumber;
                if (moreinfo != null)
                {
                    user.FullName = moreinfo.FullName;
                    user.Age = moreinfo.Age;
                    user.Address = moreinfo.Address;
                }
                data.Add(user);
            }
            return data;
        }

        [HttpGet("{id}")]
        public useritemdto getuser([FromRoute]string id)
        {
            var user = _context.Users.FirstOrDefault(t => t.Id == id);
            var userMoreInfos = _context.userMoreInfos.FirstOrDefault(t => t.Id == id);

            useritemdto model = new useritemdto();
            model.Id = user.Id;
            model.Email = user.Email;
            model.Phone = user.PhoneNumber;
            if (userMoreInfos != null)
            {
                model.FullName = userMoreInfos.FullName;
                model.Age = userMoreInfos.Age;
                model.Address = userMoreInfos.Address;
            }
            return model;

        }

        [HttpPost("editUser/{id}")]
        public ResultDto EditUser([FromRoute]string id, [FromBody]useritemdto model)
        {
            var user = _context.Users.FirstOrDefault(t => t.Id == id);
            var userMoreInfo = _context.userMoreInfos.FirstOrDefault(t => t.Id == id);

            user.PhoneNumber = model.Phone;
            userMoreInfo.FullName = model.FullName;
            user.Email = model.Email;

            _context.SaveChanges();

            return new ResultDto
            {
                Status = 200,
                Message = "OK"
            };

        }


        [HttpPost("removeuser/{id}")]
        public ResultDto RemoveUser([FromRoute]string id)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(t => t.Id == id);
                var userMoreInfos = _context.userMoreInfos.FirstOrDefault(t => t.Id == id);
                _context.Users.Remove(user);
                if (userMoreInfos != null)
                {
                    _context.userMoreInfos.Remove(userMoreInfos);
                }
                _context.SaveChanges();
                return new ResultDto
                {
                    Status = 200,
                    Message = "Ok"
                };
            }
            catch (Exception e)
            {
                List<string> temp = new List<string>();
                temp.Add(e.Message);
                return new ResultErrorDto
                { Status = 500, Message = "error", Errors = temp };


            }

        }
    }


}