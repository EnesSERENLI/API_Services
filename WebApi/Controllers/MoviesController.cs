using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApi.Models;
using WebApi.Models.DTO;

namespace WebApi.Controllers
{
    /*[Authorize]*/ //Access is restricted for non-members. We will allow users to login with tokens.
    [EnableCorsAttribute("*", "*", "*")] //We have allowed cors here instead of WebApiConfig. Because we were getting two conflicts and errors with the permission we gave in the midware layer.
    public class MoviesController : ApiController
    {
        ImdbDataEntities db = new ImdbDataEntities();

        // Get: api/movies
        public IHttpActionResult GetMovies()
        {
            var movies = db.Movies.Select(x => new MovieDTO
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                Year = x.Year,
                Rate = x.Rating
            });
            return Json(movies);
        }

        //Random Movie
        public IHttpActionResult GetRandomMovies()
        {
            try
            {
                Random rnd = new Random();
                int randomNumber = rnd.Next(1, db.Movies.Count() + 1); //Get a random number within the number of movies.
                MovieDTO movie = db.Movies.Select(x => new MovieDTO
                {
                    Id = x.Id,
                    Title = x.Title,
                    Year = x.Year,
                    Description = x.Description,
                    Rate = x.Rating
                }).FirstOrDefault(x => x.Id == randomNumber); //Bring the movie that corresponds to that number.
                return Json(movie);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
