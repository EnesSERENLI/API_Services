using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.Models;
using WebApi.Models.DTO;

namespace WebApi.Controllers
{
    [Authorize] //Access is restricted for non-members. We will allow users to login with tokens.
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
            return Ok(movies);
        }
    }
}
