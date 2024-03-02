using API.Extensions;
using Microsoft.EntityFrameworkCore;
using Persistence;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers(opt=>{
    opt.RespectBrowserAcceptHeader=true;
})//;
.AddXmlSerializerFormatters() ;
////comment the below line of comments for if you want response in XML
// .AddJsonOptions(option=>{
//         option.JsonSerializerOptions.WriteIndented=true;       
//         option.JsonSerializerOptions
//           .Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase));
//     });


builder.Services.AddApplicationServices(builder.Configuration);//All service will now Call from Extensions

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");


app.UseAuthorization();

app.MapControllers();


using var scope = app.Services.CreateScope();
var services =scope.ServiceProvider;

try 
{   
    var context=services.GetRequiredService<DataContext>();
    context.Database.Migrate();
    await Seed.SeedData(context);
}
catch(Exception ex)
{
    var logger=services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An Error occured during the Migration");
}


app.Run();

