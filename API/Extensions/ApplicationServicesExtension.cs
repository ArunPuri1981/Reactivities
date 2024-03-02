using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServicesExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
        IConfiguration config)
        {
            services.AddHttpClient("CustomClient",client=>{
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept
                .Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("text/html"));
            });


            //builder.Services.AddMvc().AddXmlSerializerFormatters();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            // builder.Services.AddTransient();
            // builder.Services.AddSingleton();
            // builder.Services.AddScoped();


            services.AddDbContext<DataContext>(opt =>
            {
                //opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
                opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            services.AddCors(opt=>{
                opt.AddPolicy("CorsPolicy",policy=>{
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
                });
            });

            services.AddMediatR(cfg=>cfg.RegisterServicesFromAssemblies(typeof(List.Handler).Assembly));
            services.AddAutoMapper(typeof(MappingProfile).Assembly);
            
            return services;
        }
    }
}