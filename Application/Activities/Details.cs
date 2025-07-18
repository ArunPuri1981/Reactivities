using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query:IRequest<Activity>
        {
            public Guid Id{get;set;}
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            public readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
               return await _context.Activities.FindAsync(request.Id);
            }
        }



    }
}