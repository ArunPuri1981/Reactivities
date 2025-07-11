using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Azure.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command:IRequest
        {
            public Activity Activity{get;set;}
        }

        public class Handler : IRequestHandler<Command>
        {
            private  readonly DataContext _context;
            private readonly IMapper _mapper ;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity= await _context.Activities.FindAsync(request.Activity.ID);
                // if (activity != null)
                // {
                    _mapper.Map(request.Activity,activity);
                    await _context.SaveChangesAsync();
                // }
            }
        }
    }
}