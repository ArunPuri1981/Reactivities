using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        // private readonly IMediator _mediator;
        //  private readonly DataContext _context;


        // public ActivitiesController(IMediator mediator)//DataContext context)//IMediator mediator
        // {
        //     //_context=context;
        //      _mediator = mediator;
        // }

       [HttpGet]//api/activities
       public async Task<ActionResult<List<Activity>>>GetActivities(CancellationToken ct)
       {
            return await Mediator.Send(new List.Query(),ct);
            //return await _context.Activities.ToListAsync();
       } 

       [HttpGet("{id}")]
       public async Task<ActionResult<Activity>>GetActivity(Guid id)
       {
          return  await Mediator.Send(new Details.Query{Id=id});
       }

       [HttpPost]
       public async Task<IActionResult> CreateActivity(Activity activity)
       {
            await Mediator.Send(new Create.Command {Activity=activity});
            return Ok();
       }

       [HttpPut("{Id}")]
       public async Task<IActionResult>EditActivity(Guid id,Activity activity)
       {
            activity.ID=id;
            await Mediator.Send(new Edit.Command{Activity=activity} );
            return Ok();
       }

       [HttpDelete("{id}")]
       public async Task<IActionResult>DeleteActivity(Guid id)
       {
          await  Mediator.Send(new Delete.Command{ Id=id });
          return Ok();
       }

    }
}