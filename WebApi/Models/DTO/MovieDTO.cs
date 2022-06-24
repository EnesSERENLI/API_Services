using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models.DTO
{
    public class MovieDTO //Data Table Objects => Instead of giving every information in the database, we will give the information we want to show thanks to DTOs.
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Year { get; set; }
        public double Rate { get; set; }
    }
}