using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Project_P34.DTO.Models;
using Microsoft.Extensions.Configuration;
using Project_IDA.DTO.Models.Result;
using Project_P34.DataAccess;
using Project_P34.DataAccess.Entity;
using Project_P34.Domain.Interfaces;
using WebCrudApi.Helpers;

namespace Project_P34.API_Angular.Controllers
{
    [Route("api/news")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IJWTTokenService _jwtTokenService;

        public NewsController(
            EFContext context,
            SignInManager<User> signInManager,
            IConfiguration configuration,
            IJWTTokenService jWtTokenService)
        {
            _context = context;
            _configuration = configuration;
            _signInManager = signInManager;
            _jwtTokenService = jWtTokenService;
        }

        [HttpPost("addnews")]
        public async Task<ResultDto> Add([FromBody]newsmodeldto model)
        {
            if (!ModelState.IsValid)
            {
                return new ResultErrorDto
                {
                    Status = 500,
                    Errors = CustomValidator.GetErrorsByModel(ModelState)
                };
            }

            var news1 = new news()
            {
                Text = model.Text,
                Title = model.Title,
                ImageUrl = model.ImageUrl,
                Likes = model.Likes,
                Subtitle = model.Subtitle

            };

            _context.News.AddAsync(news1);
            _context.SaveChanges();

            return new ResultDto
            {
                Status = 200
            };

        }


        [HttpGet]
        public IEnumerable<newsmodeldto> getnews()
        {
            List<newsmodeldto> data = new List<newsmodeldto>();

            var datadb = _context.News.ToList();

            foreach (var item in datadb)
            {
                newsmodeldto news1 = new newsmodeldto();
                news1.Text = item.Text;
                news1.Title = item.Title;
                news1.Subtitle = item.Subtitle;
                news1.Id = item.Id;
                news1.Likes = item.Likes;
                news1.ImageUrl = item.ImageUrl;
                data.Add(news1);
            }
            return data;
        }


        [HttpGet("{id}")]
        public newsmodeldto getnews([FromRoute]int id)
        {
            var item = _context.News.FirstOrDefault(t => t.Id == id);

            newsmodeldto news1 = new newsmodeldto();
            news1.Text = item.Text;
            news1.Title = item.Title;
            news1.Subtitle = item.Subtitle;
            news1.Id = item.Id;
            news1.Likes = item.Likes;
            news1.ImageUrl = item.ImageUrl;
            return news1;

        }

        [HttpPost("removenews/{id}")]
        public ResultDto RemoveNews([FromRoute]int id)
        {
            try
            {
                var news1 = _context.News.FirstOrDefault(t => t.Id == id);
                _context.News.Remove(news1);

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


        [HttpPost("editnews/{id}")]
        public ResultDto EditNews([FromRoute]int id, [FromBody]newsmodeldto item)
        {
            var news1 = _context.News.FirstOrDefault(t => t.Id == id);

            news1.Text = item.Text;
            news1.Title = item.Title;
            news1.Subtitle = item.Subtitle;
            news1.Likes = item.Likes;
            
            news1.ImageUrl = item.ImageUrl;

            _context.SaveChanges();

            return new ResultDto
            {
                Status = 200,
                Message = "OK"
            };

        }



    }
}