using Microsoft.EntityFrameworkCore;
using Szakdoga8.Logic;
using Szakdoga8.Translations;

var builder = WebApplication.CreateBuilder(args);

//builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//
builder.Services.AddHttpClient<TranslationLogic>(client =>
{
   // client.BaseAddress = new Uri(Configuration["ApiBase"]);
});

builder.Services.AddTransient<TranslationLogic>();

//builder.Services.Add<TranslationLogic>();


builder.Services.AddDbContext<TranslationsContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());


app.UseAuthorization();

app.MapControllers();

app.Run();
