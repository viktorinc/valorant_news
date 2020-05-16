using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Project_P34.DTO.Models
{
   public class newsmodeldto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Введіть Заголовок")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Введіть підзаголовок")]

        public string Subtitle { get; set; }

        [Required(ErrorMessage = "Введіть пароль")]
        public string Text { get; set; }

        [Required(ErrorMessage = "Введіть адресу фотографії")]
        public string ImageUrl { get; set; }

        [Required(ErrorMessage = "Введіть кількість лайків")]
        public int Likes { get; set; }

    }
}
