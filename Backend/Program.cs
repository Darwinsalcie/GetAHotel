using GetAHotel.Service.Location;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options => 
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});


// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ILocationWraperService, LocationWraperService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();


app.UseDefaultFiles(); // Busca index.html, default.html, etc.
app.UseStaticFiles(); // Sirve archivos estáticos desde wwwroot
app.UseCors("AllowAll"); // Aplica la política CORS definida


app.MapControllers();

app.Run();
